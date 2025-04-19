 const nodemailer=require("nodemailer");
 const {EMAIL_ID,EMAIL_PASSWORD}=require("./serverConfig")
 const sender=nodemailer.createTransport({
    service:"gmail",
    auth:{
user:EMAIL_ID,
pass:EMAIL_PASSWORD
    }
 })
 module.exports=sender;