const cron =require("node-cron");
const emailService=require("../services/email-service")
const sender=require("../config/emailConfig");
const setUpJobs=()=>{
    cron.schedule("*/2 * * * *",async()=>{
        console.log("mai bhi chal gya bhai dont worry");
       const response =await emailService.fetchPendingEmails();
    //    console.log(response);
    response.forEach((email)=>{
sender.sendMail({
    to:email.recepientEmail,
    subject:email.subject,
    text:email.content,
},async(err,data)=>{
if(err){
    console.log(err);
}else{
    console.log("dont worry");
    console.log(data);
    await emailService.updateTicket(email.id,{status:"SUCCESS"})
}
})
    })
    
    })
}
module.exports=setUpJobs;