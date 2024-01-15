const router = require("express").Router()
const userAuth = require('../middleware/userAuth')
const {createPayment, verifyPayment} = require('../controller/orderController')

router.post('/payment/createpayment',userAuth,createPayment)
router.post('/payment/verifypayment',userAuth,verifyPayment)

module.exports = router;