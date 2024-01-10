const router = require('express').Router()
const adminAuth = require('../middleware/adminAuth')
const {addProduct} = require('../controller/productController')
const upload = require('../utils/uploadFile')

router.post('/addproduct',adminAuth,upload.fields([{name:"thumbnail",maxCount:1},{name:"images"}]),addProduct)

module.exports = router