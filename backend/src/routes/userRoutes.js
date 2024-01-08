const router = require("express").Router()
const userAuth = require('../middleware/userAuth.js')
const {signUp, logIn, getUser, changeName, addAddress} = require('../controller/userController.js')

router.post('/signup',signUp)
router.post('/login',logIn)
router.get('/getuser',userAuth,getUser)
router.post('/changename',userAuth,changeName)
router.post('/addaddress',userAuth,addAddress)

module.exports=router   