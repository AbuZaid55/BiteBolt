const mongoose = require("mongoose")
const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true 
    },
    stock:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true 
    },
    category:{
        type:String,
        required:true,
        trim:true
    },
    subCategory:{
        type:String,
        required:true,
        trim:true 
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    popularList:{
        type:Boolean,
        required:true,
        default:false
    },
    thumbnail:{
        public_id: {
            type: String,
            default: '',
        },
        secure_url: {
            type: String,
            default: '',
        }
    },
    images:{
        public_id:[
            {
                type:String,
                required:true
            }
        ],
        secure_url:[
            {
                type:String,
                required:true
            }
        ]
    },
    rating:{
        type:Number,
        required:true,
        min:0
    },
    reviews:[
        {
            _id:false,
            userId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"user"
            },
            rating:{type:Number},
            comment:{type:String}
        }
    ],
    
    createdAt:{
        type:Date,
        required:true,
        default:Date.now()
    },
})

module.exports = mongoose.model("product",productSchema)