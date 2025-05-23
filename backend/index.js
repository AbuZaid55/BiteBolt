require("dotenv").config()
const express = require("express")
const dbConnect = require('./src/db/db_conn.js')
const cloudinary = require("cloudinary")
const cookie = require('cookie-parser')
const cors = require('cors')
const app = express()

const PORT = process.env.PORT || 8001
const HOST = process.env.HOST || '0.0.0.0' 

dbConnect()

app.use(express.json())
app.use(cookie())
app.use(cors({
    origin:[process.env.FRONTEND],
    credentials:true
}))

cloudinary.v2.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET 
});

app.use("/user",require('./src/routes/userRouter.js')) 
app.use("/otp",require('./src/routes/otpRouter.js')) 
app.use("/changepass",require('./src/routes/changePassRouter.js')) 
app.use("/category",require('./src/routes/categoryRouter.js')) 
app.use("/product",require('./src/routes/productRouter.js')) 
app.use("/order",require('./src/routes/orderRouter.js')) 
app.use("/payment",require('./src/routes/paymentRouter.js')) 

app.get('*',(req,res)=>{
    res.send("404 Page")
})

app.listen(PORT,HOST,()=>{
    console.log(`Backend is listening on http:/localhost:${PORT}`)
})