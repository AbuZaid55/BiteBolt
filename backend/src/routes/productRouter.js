const router = require('express').Router()
const adminAuth = require('../middleware/adminAuth')
const {addProduct, getProducts, getfilterproducts, getPopProduct, getSingleProduct, submitReview} = require('../controller/productController')
const upload = require('../utils/uploadFile')

router.post('/addproduct',adminAuth,upload.fields([{name:"thumbnail",maxCount:1},{name:"images"}]),addProduct)
router.get('/getproducts',getProducts)
router.post('/getfilterproducts',getfilterproducts)
router.post('/getpopularproducts',getPopProduct)
router.post('/getsingleproducts',getSingleProduct)
router.post('/submitreview',submitReview)

module.exports = router