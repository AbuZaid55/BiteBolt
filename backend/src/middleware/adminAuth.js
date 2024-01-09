const userModel = require("../models/userModel")
const { sendError } = require("../utils/sendResponse")
const throwError = require("../utils/throwError")
const JWT = require("jsonwebtoken")

module.exports = async(req,res,next) => {
    try {
        const token = req.cookies.BiteBoltToken 
        if(!token){
            return throwError("Unauthorized user!")
        }
        const verifyToken = JWT.verify(token,process.env.JWT_KEY)
        if(!verifyToken._id || !verifyToken.email){
            return throwError("Unauthorized user!")
        }
        const user = await userModel.findById(verifyToken._id)
        if(!user){
            return throwError("Unauthorized user!")
        }
        if(!user.admin){
            return throwError("Unauthorized User!")
        }
        user.password = undefined
        req.admin = user
        next()
    } catch (error) {
        sendError(res,error.message)
    }
}