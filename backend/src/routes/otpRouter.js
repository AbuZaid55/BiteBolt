const router = require("express").Router()

const { sendOtp} = require('../controller/otpController.js')

router.post('/sendotp',sendOtp)

module.exports=router  