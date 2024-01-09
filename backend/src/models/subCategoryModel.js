const mongoose = require("mongoose")

const subCategorySchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    products:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"product"
        }
    ]
})
module.exports = mongoose.model("subCategory",subCategorySchema)