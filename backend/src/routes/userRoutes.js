const router = require("express").Router()
const userAuth = require('../middleware/userAuth.js')
const {signUp, logIn, getUser} = require('../controller/userController.js')

router.post('/signup',signUp)
router.post('/login',logIn)
router.get('/getuser',userAuth,getUser)

module.exports=router   