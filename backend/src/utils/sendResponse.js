const sendError = (res,massage,status=500)=>{
    res.status(status).json({message:massage})
}

const sendSuccess = (res,massage,data,status=200)=>{
    if(data){
        res.status(status).json({message:massage,data:data})
    }else{
        res.status(status).json({message:massage})
    }
}

module.exports = {
    sendError,
    sendSuccess
}