const mongoose = require("mongoose")
const orderSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    totalPaidAmount:{
        type:Number,
        required:true
    },
    shippingDetails:{
        _id:{type:String,required:true},
        houseNo:{type:String,requried:true},
        address:{type:String,requried:true},
        pinCode:{type:Number,requried:true},
        city:{type:String,requried:true},
        state:{type:String,requried:true},
        phoneNo:{type:Number,required:true},
    },
    status:{
        type:String,
        requried:true,
        enum:["Placed","Confirmed","Processing","Ready to Pickup","Delivered","Cancelled","Refund"],
        default:"Placed"
    },
    item:[
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref:"product",
                default:null
            },
            qty: {
                type: Number,
                require: true
            },
        }
    ],
    razorpay_payment_id:{
        type:String,
        requried:true
    },
    razorpay_order_id:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        required:true
    }
})

module.exports = mongoose.model("order",orderSchema)