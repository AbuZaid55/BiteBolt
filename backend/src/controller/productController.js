const {sendError,sendSuccess} = require("../utils/sendResponse")
const throwError = require('../utils/throwError')
const categoryModel = require('../models/categoryModel')
const productModel = require('../models/productModel')
const subCategoryModel = require('../models/subCategoryModel')
const fs = require('fs/promises')
const cloudinary = require("cloudinary")

const addProduct = async(req,res)=>{
    let subCatId=''
    if(req.fileError){
        return sendError(res,req.fileError) 
    }
    try {
        const {name,stock,price,category,subCategory,description} = req.body 
        const thumbnail = (req.files && req.files.thumbnail)?req.files.thumbnail[0]:""
        const images = (req.files && req.files.images)?req.files.images:""
        if(!name || !stock || !price || !category || !subCategory || !description || !thumbnail || images.length==0){
            return throwError("All filed are required!")
        }
        const isCatExist = await categoryModel.findOne({name:category}).populate({path:"subCategories"})
        if(!isCatExist){
            return throwError("Invalid Categeory")
        }
        isCatExist.subCategories.map((object)=>{
            if(object.name===subCategory){
                subCatId=object._id
            }
        })
        const subCat = await subCategoryModel.findById(subCatId)
        if(!subCat){
            return throwError("Invalid SubCategory")
        }
        const uploadThumbnail = await cloudinary.v2.uploader.upload(thumbnail.path,{folder:"BiteBolt/thumbnail"})
        if(!uploadThumbnail){
            return throwError("Cloudinary Error!")
        }
        let public_id=[]
        let secure_url=[]
        await Promise.all(images.map(async(image)=>{
            const uploadImages = await cloudinary.v2.uploader.upload(image.path,{folder:"BiteBolt/images"})
            if(uploadImages){
                public_id.push(uploadImages.public_id)
                secure_url.push(uploadImages.secure_url)
            }
        }))
        const result = await productModel({name,stock,price,category,subCategory,description,thumbnail:{public_id:uploadThumbnail.public_id,secure_url:uploadThumbnail.secure_url},images:{public_id,secure_url}})
        subCat.products.push(result._id)
        await subCat.save()
        await result.save()
        result.images.public_id=undefined
        result.thumbnail.public_id=undefined
        sendSuccess(res,"Product upload successfully",result)
        fs.rm(thumbnail.path)
        images.map((object)=>{
            fs.rm(object.path)
        })
    } catch (error) {
        sendError(res,error.message)
    }
}

const getProducts = async(req,res)=>{
    try {
        const data = await productModel.find({},{'images.public_id':0,'thumbnail.public_id':0}).sort({createdAt:-1}).limit(6)
        sendSuccess(res,"Products",data)
    } catch (error) {
        sendError(res,error.message)
    }
}

const getfilterproducts = async(req,res)=>{
    const limit = process.env.PAGE_LIMIT
    try {
        let {selectedCat} = req.body
        const {filterPrice,filterRating,page,search} = req.body

        if(search){
            const result = await productModel.find({$and:[
                {price:{$lte:Number(filterPrice)}},
                {rating:{$gte:Number(filterRating)}},
                {
                    $or:[
                        {name:{$regex:search,$options:"i"}},
                        {category:{$regex:search,$options:"i"}},
                        {subCategory:{$regex:search,$options:"i"}},
                        {description:{$regex:search,$options:"i"}},
                    ]
                }
            ]},{'images.public_id':0,'thumbnail.public_id':0}).sort({createdAt:-1}).skip(limit*(page-1)).limit(limit)
            sendSuccess(res,"Search Products",result) 
        }else{
            if(selectedCat.length==0){
                selectedCat=[{}]
            }
            const result = await productModel.find({$and:[
                {price:{$lte:Number(filterPrice)}},
                {rating:{$gte:Number(filterRating)}},
                {
                    $or:selectedCat
                }
            ]},{'images.public_id':0,'thumbnail.public_id':0}).sort({createdAt:-1}).skip(limit*(page-1)).limit(limit)
            sendSuccess(res,"Filter Products",result) 
        }
    } catch (error) {
        sendError(res,error.message)
    }
}

const getPopProduct = async(req,res)=>{
    const limit = process.env.PAGE_LIMIT
    try {
        const {page} = req.body
        const result = await productModel.find({popularList:true},{'images.public_id':0,'thumbnail.public_id':0}).sort({createdAt:-1}).skip(limit*(page-1)).limit(limit)
        sendSuccess(res,"Popular Products",result)
    } catch (error) {
        sendError(res,error.message)
    }
}

const getSingleProduct = async(req,res)=>{
    try {
        const {_id}=req.body
        if(!_id){
            return throwError("Product Id not found!")
        }
        const result = await productModel.findOne({_id:_id},{'images.public_id':0,'thumbnail.public_id':0}).populate({
            path:'reviews.userId',
            select:"name profile.secure_url"
        })
        if(!result){
            return throwError("Product not found!")
        }
        sendSuccess(res,"Product Details",result)
    } catch (error) {
        sendError(res,error.message)
    }
}

const submitReview = async(req,res)=>{
    let commentExist = false
    try {
        const {userId,rating,comment,productId}=req.body
        if(!userId){
            return throwError("Unauthorized User!")
        }
        if(!rating){
            return throwError("Select Rating!")
        }
        if(!comment){
            return throwError("Enter Your Comment!")
        }
        if(!productId){
            return throwError("Product Id not found!")
        }
        const dbProduct = await productModel.findById(productId)
        if(!dbProduct){
            return throwError("Product not found!")
        }
        const newList = dbProduct.reviews.filter((object)=>{
            if(object.userId==userId){
                commentExist=true
                object.rating=rating,
                object.comment=comment
            }
            return object
        })
        if(commentExist){
            dbProduct.reviews = newList
            const totalRating = newList.reduce((total,current)=>{
                total = total+current.rating 
                return total
            },0)
            dbProduct.rating = totalRating/newList.length
            await dbProduct.save()
            return sendSuccess(res,"Your comment updated successfully")
        }
        dbProduct.reviews.push({userId,rating,comment})
        const totalRating = dbProduct.reviews.reduce((total,current)=>{
            total = total+current.rating 
            return total
        },0)
        dbProduct.rating = totalRating/dbProduct.reviews.length
        await dbProduct.save()
        sendSuccess(res,"Your comment added successfully")
    } catch (error) {
        sendError(res,error.message)
    }
}

const deleteReview = async(req,res)=>{
    try {
        const {userId,productId}=req.body 
        if(!userId || !productId){
            return throwError("User Id or Product Id not found!")
        }
        const dbProduct = await productModel.findById(productId)
        if(!dbProduct){
            return throwError("Product not found!")
        }
        const newList = dbProduct.reviews.filter((object)=>{
            return object.userId!=userId
        })
        const totalRating = newList.reduce((total,current)=>{
            total = total+current.rating 
            return total
        },0)
        if(newList.length==0){
            dbProduct.rating=0
        }else{
            dbProduct.rating = totalRating/newList.length
        }
        dbProduct.reviews = newList
        await dbProduct.save()
        sendSuccess(res,"Review Deleted successfully") 
    } catch (error) {
        sendError(res,error.message)
    }
}

const similarProduct = async(req,res)=>{
    const limit = process.env.PAGE_LIMIT
    try {
        const {_id,page}=req.body
        if(!_id){
            return throwError("Product Id not Found!")
        }
        const product = await productModel.findById(_id)
        if(!product){
            return throwError("Product not found!")
        }
        const result = await productModel.find({category:product.category,subCategory:product.subCategory,_id:{$ne:product._id}}).skip(limit*(page-1)).limit(limit)
        sendSuccess(res,"Similar products",result)
    } catch (error) {
        sendError(res,error.message)
    }
}

module.exports = {
    addProduct,
    getProducts,
    getfilterproducts,
    getPopProduct,
    getSingleProduct,
    submitReview,
    deleteReview,
    similarProduct,
}