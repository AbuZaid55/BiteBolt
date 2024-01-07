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
        const isMatch = otpExist.compareOtp(otp)
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


module.exports = {
    signUp,
}