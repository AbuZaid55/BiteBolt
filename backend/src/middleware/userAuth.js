const userModel = require("../models/userModel")
const { sendError } = require("../sendResponse")
const throwError = require("../throwError")
const JWT = require("jsonwebtoken")

module.exports = async(req,res,next) => {
    try {
        const token = req.cookies.BiteBoltToken 
        if(!token){
            return throwError("Unauthorized user!")
        }
        const verifyToken = JWT.verify(token,process.env.JWT_KEY)
        if(!verifyToken._id && !verifyToken.email){
            return throwError("Unauthorized user!")
        }
        const user = await userModel.findById(verifyToken._id)
        if(!user){
            return throwError("Unauthorized user!")
        }
        user.password=undefined
        req.rootUser=user
        next()
    } catch (error) {
        sendError(res,error.message)
    }
}