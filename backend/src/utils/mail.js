const nodemailer = require('nodemailer')
const {otpMailTemplate,linkSendMailTemplate,contactMailTemplate} = require('./mailTemplate')

var transporter = nodemailer.createTransport({
    host:process.env.MAIL_HOST,
    port:process.env.MAIL_PORT,
    secure:false,
    requireTLS:true,
    auth:{
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PASS
    }
})

const otpMail = (to,otp) =>{
    transporter.sendMail({
        from:process.env.MAIL_USER,
        to:to,
        subject:"BiteBolt || Verify Email",
        html:otpMailTemplate(otp)
    },(err,info)=>{
        if(err){
            console.log(err)
        }else{
            console.log("Mail send successfully")
        }
    })
}

const linkSendMail = (to,link)=>{
    transporter.sendMail({
        from: process.env.MAIL_USER,
        to: to,
        subject:"BiteBolt || Change your password",
        html: linkSendMailTemplate(link)
    },(err,info)=>{
        if(err){
            console.log(err)
        }else{
            console.log("Mail successfull sent")
        }
    })
}

const contactMail = (name,email,phone,subject,massage)=>{
    transporter.sendMail({
        from: email,
        to: process.env.MAIL_USER,
        subject:"BiteBolt || Contact Mail",
        html: contactMailTemplate(name,email,phone,subject,massage)
    },(err,info)=>{
        if(err){
            console.log(err)
        }else{
            console.log("Mail successfull sent")
        }
    })
}

module.exports = {
    otpMail,
    linkSendMail,
    contactMail
};