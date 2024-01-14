const router = require("express").Router()
const userAuth = require('../middleware/userAuth.js')
const upload = require('../utils/uploadFile.js')
const {signUp, logIn, getUser, changeName, addAddress, uploadFile, logOut, addToCart, getCartItems, updateQty, deleteCartItem, addToWishlist} = require('../controller/userController.js')

router.post('/signup',signUp)
router.post('/login',logIn)
router.get('/getuser',userAuth,getUser)
router.post('/changename',userAuth,changeName)
router.post('/addaddress',userAuth,addAddress)
router.post('/uploadfile',userAuth,upload.single("file"),uploadFile)
router.get('/logout',logOut)
router.post('/addtocart',userAuth,addToCart)
router.get('/getcartitems',userAuth,getCartItems)
router.post('/updateqty',userAuth,updateQty)
router.post('/deletecartitem',userAuth,deleteCartItem)
router.post('/addtowishlist',userAuth,addToWishlist)

module.exports=router   