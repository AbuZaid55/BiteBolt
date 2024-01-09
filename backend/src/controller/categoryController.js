const categoryModel = require("../models/categoryModel")
const subCategoryMoel = require('../models/subCategoryModel')
const userModel = require("../models/userModel")
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
        const result = await categoryModel.find().populate({path:"subCategories",select:"name"})
        sendSuccess(res,"Categories",{highestPrice:200,categories:result})
    } catch (error) {
        sendError(res,error.message)
    }
}

module.exports = {
    addCategory,
    addSubCategory,
    getCategories,
}