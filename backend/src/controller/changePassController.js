const throwError = require("../utils/throwError.js")
const validator = require("email-validator")
const userModel = require('../models/userModel.js')
const changePassModel = require('../models/changePassModel.js')
const {linkSendMail} = require('../utils/mail.js')
const {sendError,sendSuccess} = require('../utils/sendResponse.js')
const JWT = require('jsonwebtoken')

const sendLink = async(req,res)=>{
    try {
        const {email}=req.body 
        if(!email){
            return throwError("Enter your email!")
        }
        if(!validator.validate(email)){
            return throwError("Invalid Email!")
        }
        const user = await userModel.findOne({email})
        if(!user){
            return throwError("Invalid User!")
        }
        await changePassModel.deleteMany({userId:user._id})
        const token = user.generateToken()
        linkSendMail(user.email,`${process.env.FRONTEND}/changepass?token=${token}`)
        await changePassModel({userId:user._id,token:token}).save()
        sendSuccess(res,"Link send successfully")
    } catch (error) {
        sendError(res,error.message)
    }
}

const updatePass = async(req,res)=>{
    try {
        const {password,confirm_pass,token}=req.body 
        if(!password || !confirm_pass){
            return throwError("Enter password or confirm password!")
        }
        if(password.length < 8 || password.length > 12){
            return throwError("Password should be 8 to 12 characters!")
        }
        if(password!==confirm_pass){
            return throwError("Password is not matching!")
        }
        if(!token){
            return throwError("Invalid Token!")
        }
        const verifyToken = JWT.verify(token,process.env.JWT_KEY)
        if(!verifyToken._id && !verifyToken.email){
            return throwError("Invalid Token")
        }
        const user = await userModel.findOne({_id:verifyToken._id, email:verifyToken.email})
        if(!user){
            return throwError("Unauthorized User!")
        }
        const DBToken = await changePassModel.findOne({userId:verifyToken._id,token:token})
        if(!DBToken){
            return throwError("Link Expired!")
        }
        user.password=password
        await user.save()
        await changePassModel.deleteMany({userId:verifyToken._id})
        sendSuccess(res,"Password change successfully")
    } catch (error) {
        sendError(res,error.message)
    }
}

module.exports = {
    sendLink,
    updatePass
}