const mongoose = require("mongoose")
const dbConnect = ()=>{
    mongoose.connect(process.env.DB_URL).then(()=>{
        console.log("DB connected successfully")
    }).catch((err)=>{
        console.log(`No connection ${err}`)
    })
}

module.exports = dbConnect