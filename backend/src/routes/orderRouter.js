const router = require("express").Router()
const userAuth = require('../middleware/userAuth')
const {createPayment, verifyPayment, getOrders, getStatus} = require('../controller/orderController')

router.post('/payment/createpayment',userAuth,createPayment)
router.post('/payment/verifypayment',userAuth,verifyPayment)
router.get('/getorders',userAuth,getOrders)
router.post('/getstatus',getStatus)

module.exports = router;