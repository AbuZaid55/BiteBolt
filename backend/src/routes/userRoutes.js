const router = require("express").Router()
const {getUser, sendOtp} = require('../controller/userController.js')

router.get('/',getUser)
router.post('/sendotp',sendOtp)

module.exports=router   