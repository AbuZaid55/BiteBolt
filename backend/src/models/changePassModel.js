const mongoose = require("mongoose")
const JWT = require('jsonwebtoken')

const changePasSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    token:{
        type:String,
        required:true,
    }
},{timestamps:true})

changePasSchema.index({createdAt:1},{expireAfterSeconds:Number(process.env.EXPIRE_TOKEN_TIME )})

module.exports=mongoose.model("changePass",changePasSchema)