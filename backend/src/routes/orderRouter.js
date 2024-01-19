const router = require("express").Router()
const userAuth = require('../middleware/userAuth')
const adminAuth = require('../middleware/adminAuth')
const {createPayment, verifyPayment, getOrders, getStatus, updataDetails, cancleOrder, getAdminOrders, changeStatus, getOrdersLength} = require('../controller/orderController')

router.post('/payment/createpayment',userAuth,createPayment)
router.post('/payment/verifypayment',userAuth,verifyPayment)
router.get('/getorders',userAuth,getOrders)
router.post('/getstatus',getStatus)
router.post('/updatedetails',userAuth,updataDetails)
router.post('/cancleorder',userAuth,cancleOrder)
router.post('/getadminorders',adminAuth,getAdminOrders)
router.post('/changestatus',adminAuth,changeStatus)
router.get('/getorderslength',getOrdersLength)

module.exports = router;