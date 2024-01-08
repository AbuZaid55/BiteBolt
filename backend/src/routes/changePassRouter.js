const router = require("express").Router()
const {sendLink, updatePass} = require('../controller/changePassController.js')

router.post('/sendlink',sendLink)
router.post('/updatepass',updatePass)

module.exports=router;