const userModel = require('../models/userModel')
const otpModel = require('../models/otpModel')
const throwError = require('../throwError')
const {sendError,sendSuccess} = require("../sendResponse")
const validator = require("email-validator")

const signUp = async (req, res) => {
    try {
        const {name,email,password,confirm_pass,otp}=req.body
        if(!name || !email || !password || !confirm_pass || !otp){
            return throwError("All field are required!")
        }
        if(password !== confirm_pass){
            return throwError("Confirm password is not matching")
        }
        if(password.length < 8 && password.length > 12){
            return throwError("Password should be 8 to 12 characters!")
        }
        if(!validator.validate(email)){
            return throwError("Invalid Email!")
        }
        const userExist = await userModel.findOne({email})  
        if(userExist){
            return throwError("User Already Exist!")
        }
        const otpExist = await otpModel.findOne({email})
        if(!otpExist){
            return throwError("Invalid Otp!")
        }
        const isMatch = await otpExist.compareOtp(otp)
        if(!isMatch){
            return throwError("Enter correct Otp!")
        }
        await otpModel.deleteMany({email})
        await userModel(req.body).save()
        sendSuccess(res,"Signup successfully")
    } catch (error) {
       sendError(res,error.message) 
    }
}

const logIn = async(req,res) =>{
    try {
        const {email,password}=req.body
        if(!email || !password){
            return throwError("All field are required!")
        }
        if(!validator.validate(email)){
            return throwError("Invalid email or password")
        }
        const user = await userModel.findOne({email})
        if(!user){
            return throwError("Invalid email or password")
        }
        const matchPass = await user.comparePass(password)
        if(!matchPass){
            return throwError("Invalid email or password")
        }
        user.password=undefined
        const token = user.generateToken()
        res.cookie('BiteBoltToken',token,{
            expires:new Date(Date.now() + Number(process.env.EXPIRE_COOKIE_TIME)),
            httpOnly:true
        })
        sendSuccess(res,"Login successfully")
    } catch (error) {
        sendError(res,error.message)
    }
}

const getUser = async(req,res) => {
    sendSuccess(res,"Authorized User",req.rootUser)
}

const changeName = async(req,res) => {
    try {
        const {_id,name} = req.body
        if(!name){
            return throwError("Enter your name")
        }
        if(!_id){
            return throwError("Unauthorized User!")
        }
        const user = await userModel.findById(_id)
        if(!user){
            return throwError("Unauthorized User!")
        }
        user.name=name
        await user.save()
        sendSuccess(res,"Name change successfully")
    } catch (error) {
        sendError(res,error.message)
    }
}
const addAddress = async(req,res)=>{
    try {
        const {_id,name,houseNo,address,pinCode,city,state,phoneNo} = req.body
        if(!name || !houseNo || !address || !pinCode || !city || !state || !phoneNo){
            return throwError("All field are required!")
        }
        if(!_id){
            return throwError("Unauthorized User!")
        }
        const user = await userModel.findById(_id)
        if(!user){
            return throwError("Unauthorized User!")
        }
        req.body._id=undefined
        user.shippingDetails = [...user.shippingDetails,req.body]
        await user.save()
        sendSuccess(res,"Shipping details added successfully",req.body)
    } catch (error) {
        sendError(res,error.message)
    }
}

module.exports = {
    signUp,
    logIn,
    getUser,
    changeName,
    addAddress,
}