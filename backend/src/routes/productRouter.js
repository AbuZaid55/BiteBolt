const router = require('express').Router()
const adminAuth = require('../middleware/adminAuth')
const {addProduct} = require('../controller/productController')

router.post('/addproduct',adminAuth,addProduct)

module.exports = router