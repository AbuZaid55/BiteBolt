const router = require("express").Router()
const {getUser} = require('../controller/user.js')

router.get('/',getUser)

module.exports=router   