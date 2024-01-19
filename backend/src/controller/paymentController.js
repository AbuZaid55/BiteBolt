const mongoose = require("mongoose")
const throwError = require("../utils/throwError")
const {sendError,sendSuccess} = require('../utils/sendResponse')
const paymentModel = require('../models/PaymentModel')

const getPayment = async(req,res)=>{
    const limit = process.env.PAGE_LIMIT
    try {
        const {search,page}=req.body 
        const skip = limit*(page-1)
        if(mongoose.Types.ObjectId.isValid(search)){
            const result = await paymentModel.find({$or:[ 
                {_id:search},
                {userId:search}
            ]}).sort({_id:-1}).skip(skip).limit(limit)
            sendSuccess (res,"Payment Details",result)
        }else{
            const result = await paymentModel.find({$or:[
                {username:{$regex:search,$options:"i"}},
                {email:{$regex:search,$options:"i"}},
                {razorpay_payment_id:{$regex:search,$options:"i"}},
                {razorpay_order_id:{$regex:search,$options:"i"}},
            ]}).sort({_id:-1}).skip(skip).limit(limit)
        sendSuccess (res,"Payment Details",result)
        }
    } catch (error) {
        sendError(res,error.message)
    }
}

const deletePayment = async(req,res)=>{
    try {
        const {_id}=req.body
        if(!_id){
            return throwError("Payment id not found!")
        }
        await paymentModel.findByIdAndDelete(_id)
        sendSuccess(res,"Payment delete successfully!")
    } catch (error) {
        sendError(res,error.message)
    }
}

const getTotalPayment = async(req,res)=>{
    try {
        const result = await paymentModel.aggregate([
            {
              $group: {
                _id: null,
                totalAmount: { $sum: '$totalPaidAmount' },
              },
            },
          ]);
          sendSuccess(res,"Total Payment",result[0].totalAmount)
    } catch (error) {
        sendError(res,error.message)
    }
}

const getChartPayment = async(req,res)=>{
    const limit = 7
    try {
        const {page}=req.body
        if(!page){
            return throwError("Page not not found!")
        }
        const skip = limit*(page-1)
        const result = await paymentModel.find({},{totalPaidAmount:1,_id:0}).sort({_id:-1}).skip(skip).limit(limit)
        sendSuccess(res,"Payment Chart Dashboard",result)
    } catch (error) {
        sendError(res,error.message)
    }
}

module.exports = {
    getPayment,
    deletePayment,
    getTotalPayment,
    getChartPayment
}