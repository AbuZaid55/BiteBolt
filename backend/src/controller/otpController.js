const validator = require("email-validator")
const otpModel = require("../models/otpModel")
const userModel = require("../models/userModel")
const generateOtp = require('../utils/generateOtp')
const { otpMail } = require('../utils/mail')
const throwError = require('../utils/sendResponse')
const {sendError,sendSuccess} = require('../utils/sendResponse')


const sendOtp = async (req, res) => {
    try {
        const { email } = req.body
        if (!email) {
            return throwError("Enter your email!")
        }
        if (!validator.validate(email)) {
            return throwError("Invalid email!")
        }

        const isExist = await userModel.findOne({ email })
        if (isExist) {
            return throwError("User Already Exist!")
        }
        await otpModel.deleteMany({ email })
        const otp = generateOtp()
        otpMail(email,otp)
        await otpModel({ email, otp }).save()
        sendSuccess(res,"Otp send successfully")
    } catch (error) {
        sendError(res,error.message)
    }
}

module.exports = {
    sendOtp,
}