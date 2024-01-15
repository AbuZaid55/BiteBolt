const throwError = require("../utils/throwError")
const {sendError,sendSuccess} = require("../utils/sendResponse")
const userModel = require("../models/userModel")
const productModel = require('../models/productModel')
const orderModel = require('../models/orderModel')
const paymetnModel = require('../models/paymentModel')
const Razorpay = require("razorpay")
const crypto = require('crypto')

const createPayment = async(req,res)=>{
    try {
        const {name,phoneNo,pinCode,houseNo,city,state,address} = req.body 
        const shippingId = req.body._id
        const {_id}=req.rootUser
        if(!_id){
            return throwError("Unauthorized User!")
        }
        if(!name || !phoneNo ||!pinCode || !houseNo || !city || !state || !address || !shippingId){
            return throwError("Select Shipping Details!")
        }
        const user = await userModel.findById(_id).populate({path:"cart.productId",select:"name price stock thumbnail.secure_url"})
        if(!user){
            return throwError("Unauthorized User!")
        }
        const totalAmount = user.cart.reduce((total,current)=>{
            return total=total+current.productId.price*current.qty
        },0)
        const instance = new Razorpay({
            key_id:process.env.RAZORPAY_KEY_ID,
            key_secret:process.env.RAZORPAY_KEY_SECRET,
        })
        const option = {
            amount:totalAmount*100,
            currency:"INR",
            receipt:crypto.randomBytes(10).toString('hex')
        }
        instance.orders.create(option,(err,order)=>{
            if(err){
                return throwError("Payment Error!")
            }
            order["razorpay_key_id"]=process.env.RAZORPAY_KEY_ID
            sendSuccess(res,"Create Payment Successfully",{...order,name,phoneNo,pinCode,houseNo,city,state,address,totalAmount,shippingId})
        })
    } catch (error) {
        sendError(res,error.message)
    }
}

const verifyPayment = async(req,res)=>{
    try {
        const {razorpay_order_id,razorpay_payment_id,razorpay_signature,name,phoneNo,pinCode,houseNo,city,state,address,totalAmount,shippingId}=req.body 
        const {_id}=req.rootUser
        const sign = razorpay_order_id+ "|" +razorpay_payment_id
        const expectedSign = crypto.createHmac("sha256",process.env.RAZORPAY_KEY_SECRET).update(sign.toString()).digest("hex")
        if(expectedSign===razorpay_signature){
            const user = await userModel.findById(_id).populate({path:"cart.productId",select:"name price stock thumbnail.secure_url"})
            user.cart.map(async(item)=>{
                const product = await productModel.findById(item.productId)
                if(product.stock<=item.qty){
                    product.stock=0
                }else{
                    product.stock=product.stock-item.qty
                }
                await product.save()
            })
            await orderModel({username:name,userId:_id,totalPaidAmount:totalAmount,shippingDetails:{phoneNo,pinCode,houseNo,city,state,address,_id:shippingId},item:user.cart,razorpay_payment_id:razorpay_payment_id,razorpay_order_id:razorpay_order_id}).save()
            user.cart = []
            await user.save()
            await paymetnModel({username:user.name,userId:_id,email:user.email,phoneNo,totalPaidAmount:totalAmount,razorpay_payment_id,razorpay_order_id}).save()
            sendSuccess(res,"Your Order has been Placed successfully")
        }else{
            return throwError("Payment Failed!")
        }
    } catch (error) {
        console.log(error)
        sendError(res,error.message)
    }
}

const getOrders = async(req,res)=>{
    try {
        const {_id}=req.rootUser
        const result = await orderModel.find({userId:_id},{razorpay_payment_id:0,razorpay_order_id:0}).sort({_id:-1}).populate({path:"item.productId",select:"name price thumbnail.secure_url"})
        sendSuccess(res,"Your orders",result)
    } catch (error) {
        sendError(res,error.message)
    }
}

module.exports = {
    createPayment,
    verifyPayment,
    getOrders,
}