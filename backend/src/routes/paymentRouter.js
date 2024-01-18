const router = require("express").Router()
const adminAuth = require('../middleware/adminAuth')
const {getPayment, deletePayment} = require('../controller/paymentController')

router.post('/getpayment',adminAuth,getPayment)
router.post('/deletepayment',adminAuth,deletePayment)

module.exports=router;