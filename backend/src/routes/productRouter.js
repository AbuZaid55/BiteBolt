const router = require('express').Router()
const adminAuth = require('../middleware/adminAuth')
const {addProduct, getProducts, getfilterproducts, getPopProduct, getSingleProduct, submitReview, deleteReview, similarProduct, getAdminProducts, updateProduct, deleteProduct} = require('../controller/productController')
const upload = require('../utils/uploadFile')
const userAuth = require('../middleware/userAuth')

router.post('/addproduct',adminAuth,upload.fields([{name:"thumbnail",maxCount:1},{name:"images"}]),addProduct)
router.get('/getproducts',getProducts)
router.post('/getfilterproducts',getfilterproducts)
router.post('/getpopularproducts',getPopProduct)
router.post('/getsingleproducts',getSingleProduct)
router.post('/submitreview',userAuth,submitReview)
router.post('/deletereview',userAuth,deleteReview)
router.post('/similarproducts',similarProduct)
router.post('/getadminproducts',adminAuth,getAdminProducts)
router.post('/updateproduct',adminAuth,updateProduct)
router.post('/deleteproduct',adminAuth,deleteProduct)

module.exports = router