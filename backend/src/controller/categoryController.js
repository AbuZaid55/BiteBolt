const categoryModel = require("../models/categoryModel")
const subCategoryMoel = require('../models/subCategoryModel')
const userModel = require("../models/userModel")
const productModel = require('../models/productModel')
const throwError = require("../utils/throwError")
const {sendError,sendSuccess} = require('../utils/sendResponse')

const addCategory = async(req,res)=>{
    try {
        const {category}=req.body
        if(!category){
            return throwError("Enter category name!")
        }
        const isExist = await categoryModel.findOne({name:category})
        if(isExist){
            return throwError("Category name already exist!")
        }
        const result = await categoryModel({name:category}).save()
        sendSuccess(res,"Category Added Successfully!",result)
    } catch (error) {
        sendError(res,error.message)
    }
}

const addSubCategory = async(req,res)=>{
    try {
        const {category,subCategory}=req.body
        if(!category){
            return throwError("Select category!")
        }
        if(!subCategory){
            return throwError("Enter subCategory name!")
        }
        const isCatExist = await categoryModel.findOne({name:category}).populate({path:"subCategories",select:"name"})
        if(!isCatExist){
            return throwError("Invalid category!")
        }
        const subCatExist =isCatExist.subCategories.filter((object)=>object.name===subCategory)
        if(subCatExist.length>0){
            return throwError("SubCategory already exist in this category!")
        }
        const result = await subCategoryMoel({name:subCategory})
        isCatExist.subCategories.push(result._id)
        await isCatExist.save()
        await result.save()
        sendSuccess(res,"SubCategory Added Successfully!",{category:category,subCategory:{_id:result._id,name:subCategory}})
    } catch (error) {
        sendError(res,error.message)
    }
}

const getCategories = async(req,res)=>{ 
    try {
        let highestPrice=0
        const result = await categoryModel.find().populate({path:"subCategories",select:"name"})
        const highestPriceProduct = await productModel.findOne().sort({ price: -1 });
        if(highestPriceProduct){
            highestPrice = highestPriceProduct.price
        }
        sendSuccess(res,"Categories",{highestPrice,categories:result})
    } catch (error) {
        sendError(res,error.message)
    }
}

const deleteSubCategory = async(req,res)=>{
    try {
        const {subCatId,catId}=req.body
        if(!subCatId){
            return throwError("SubCategory id not found!")
        }if(!catId){
            return throwError("Categegory Id not found!")
        }
        const result = await subCategoryMoel.findById(subCatId)
        if(!result){
            return throwError("SubCategory not found!")
        }
        await productModel.deleteMany({ _id: { $in: result.products } });
        await subCategoryMoel.findByIdAndDelete(subCatId);
        const category = await categoryModel.findById(catId)
        const newList = category.subCategories.filter((id)=>id!=subCatId)
        category.subCategories=newList
        await category.save()
        sendSuccess(res,"SubCategory delete successfully")
    } catch (error) {
        sendError(res,error.message)
    }
}

const deleteCategory = async(req,res)=>{
    try {
        const {_id}=req.body
        if(!_id){
            return throwError("Category id not found!")
        }
        const result = await categoryModel.findById(_id)
        if(!result){
            return throwError("Category not found!")
        }
        if(!result.subCategories.length<=0){
            return throwError("First delete all subCategories!")
        }
        await categoryModel.findByIdAndDelete(_id)
        sendSuccess(res,"Category delete successfully")
    } catch (error) {
        sendError(res,error.message)
    }
}

module.exports = {
    addCategory,
    addSubCategory,
    getCategories,
    deleteSubCategory,
    deleteCategory,
}