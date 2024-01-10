require("dotenv").config()
const express = require("express")
const dbConnect = require('./db/db_conn.js')
const cloudinary = require("cloudinary")
const cookie = require('cookie-parser')
const cors = require('cors')
const app = express()

const PORT = process.env.PORT  
const HOSTNAME = process.env.HOSTNAME 

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

app.use("/user",require('./routes/userRouter.js')) 
app.use("/otp",require('./routes/otpRouter.js')) 
app.use("/changepass",require('./routes/changePassRouter.js')) 
app.use("/category",require('./routes/categoryRouter.js')) 
app.use("/product",require('./routes/productRouter.js')) 

app.get('*',(req,res)=>{
    res.send("404 Page")
})

app.listen(PORT,HOSTNAME,()=>{
    console.log(`App is listening on http://${HOSTNAME}:${PORT}`)
})