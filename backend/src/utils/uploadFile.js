const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null,"src/Images")
    },
    filename(req,file,cb){
        cb(null,Date.now()+Math.random()+'_'+file.originalname)
    }
})

const limits = {fileSize:20*1024*1024}

const fileFilter = (req,file,cb) => {
    let ext = path.extname(file.originalname)
    if(ext==='.jpg' || ext==='.png' || ext==='.jpeg' || ext==='.webp'){
        cb(null,true)
    }else{
        req.fileError = `File should .jpg, .png, .jpeg, .webp and max size 20MB`
        cb(null,false)
    }
}

const upload = multer({storage,limits,fileFilter})

module.exports = upload