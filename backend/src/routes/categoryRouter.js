const router = require("express").Router()
const adminAuth = require("../middleware/adminAuth")
const {addCategory, addSubCategory, getCategories, deleteSubCategory, deleteCategory} = require("../controller/categoryController")

router.post('/addcategory',adminAuth,addCategory)
router.post('/addsubcategory',adminAuth,addSubCategory)
router.get('/getcategories',getCategories)
router.post('/deletesubcategory',adminAuth,deleteSubCategory)
router.post('/deletecategory',adminAuth,deleteCategory)

module.exports = router;