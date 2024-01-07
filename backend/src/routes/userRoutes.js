const router = require("express").Router()
const {getUser} = require('../controller/userController.js')

router.get('/',getUser)

module.exports=router   