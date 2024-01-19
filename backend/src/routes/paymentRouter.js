const router = require("express").Router()
const adminAuth = require('../middleware/adminAuth')
const {getPayment, deletePayment, getTotalPayment, getChartPayment} = require('../controller/paymentController')

router.post('/getpayment',adminAuth,getPayment)
router.post('/deletepayment',adminAuth,deletePayment)
router.get('/gettotalpayment',adminAuth,getTotalPayment)
router.post('/getchartpayment',adminAuth,getChartPayment)

module.exports=router;