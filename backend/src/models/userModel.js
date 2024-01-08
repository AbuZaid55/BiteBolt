const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    profile: {
        public_id: {
            type: String,
            default: '',
        },
        secure_url: {
            type: String,
            default: 'https://res.cloudinary.com/dq25thxp1/image/upload/v1704540379/BiteBolt/DefaultProfile/pjkfmlawexntfufbnzte.png',
        }
    },
    admin: {
        type: Boolean,
        default: false,
    },
    shippingDetails: [
        {
            _id: false,
            name: {
                type: String,
                required: true,
                trim: true
            },
            houseNo: {  
                type: String,
                required: true,
                trim: true
            },
            address: {
                type: String,
                required: true,
                trim: true
            },
            pinCode: {
                type: Number,
                required: true,
                trim: true
            },
            city: {
                type: String,
                required: true,
                trim: true
            },
            state: {
                type: String,
                required: true,
                trim: true
            },
            phoneNo: {
                type: Number,
                required: true,
                trim: true
            }
        }
    ],
    cart: [
        {
            _id: false,
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref:"product",
                required: true
            },
            qty: {
                type: Number,
                require: true
            },
        }
    ],
    wishlist: [
       {
        type:mongoose.Schema.Types.ObjectId,
        ref:"product",
        required:true
       }
    ],
    date: {
        type: Date,
        required: true,
        default: Date.now()
    }
})

userSchema.pre('save', async function(next){
    if(this.isModified("password")){
        const hashPass = await bcrypt.hash(this.password,12)
        this.password = hashPass
    }
    next()
})

userSchema.methods = {
    async comparePass (password){
        return await bcrypt.compare(password,this.password)
    },
    generateToken(){
        return JWT.sign({_id:this._id,email:this.email},process.env.JWT_KEY)
    }
}

module.exports = mongoose.model("user",userSchema)