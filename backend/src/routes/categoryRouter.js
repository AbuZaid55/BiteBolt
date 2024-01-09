const router = require("express").Router()
const adminAuth = require("../middleware/adminAuth")
const {addCategory, addSubCategory, getCategories} = require("../controller/categoryController")

router.post('/addcategory',adminAuth,addCategory)
router.post('/addsubcategory',adminAuth,addSubCategory)
router.get('/getcategories',getCategories)

module.exports = router;