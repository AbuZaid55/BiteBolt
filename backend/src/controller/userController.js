const getUser = async(req,res)=>{
    res.send("Hello User")
}

const sendOtp = async(req,res)=>{
    console.log("run..")
    res.send("Otp send successfully")
}

module.exports = {
    getUser,
    sendOtp,
}