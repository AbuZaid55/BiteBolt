const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const otpSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true
    },
    otp:{
        type:String,
        required:true,
        trim:true
    }
},{timestamps:true})

otpSchema.index({createdAt:1},{expireAfterSeconds:Number(process.env.EXPIRE_TOKEN_TIME )})

otpSchema.pre("save",async function(next){
    if(this.isModified("otp")){
        const hashOtp = await bcrypt.hash(this.otp,8)
        this.otp = hashOtp
    }
    next()
})

otpSchema.methods = {
    compareOtp (otp){
        return bcrypt.compare(otp,this.otp)
    }
}

module.exports = mongoose.model('otp',otpSchema)