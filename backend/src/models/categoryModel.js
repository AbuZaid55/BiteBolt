const mongoose = require("mongoose")

const categorySchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    subCategories:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"subCategory"
        }
    ]
})
module.exports = mongoose.model("category",categorySchema)