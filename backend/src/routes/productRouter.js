const router = require('express').Router()
const adminAuth = require('../middleware/adminAuth')
const {addProduct, getProducts, getfilterproducts, getPopProduct} = require('../controller/productController')
const upload = require('../utils/uploadFile')

router.post('/addproduct',adminAuth,upload.fields([{name:"thumbnail",maxCount:1},{name:"images"}]),addProduct)
router.get('/getproducts',getProducts)
router.post('/getfilterproducts',getfilterproducts)
router.post('/getpopularproducts',getPopProduct)

module.exports = router