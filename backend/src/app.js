require("dotenv").config()
const express = require("express")
const dbConnect = require('./db/db_conn.js')
const cors = require('cors')
const app = express()

const PORT = process.env.PORT  
const HOSTNAME = process.env.HOSTNAME 

dbConnect()

app.use(express.json())
app.use(cors({
    origin:[process.env.FRONTEND],
    credentials:true
}))

app.use("/user",require('./routes/userRoutes.js'))
app.use("/otp",require('./routes/otpRoutes.js')) 

app.get('*',(req,res)=>{
    res.send("404 Page")
})

app.listen(PORT,HOSTNAME,()=>{
    console.log(`App is listening on http://${HOSTNAME}:${PORT}`)
})