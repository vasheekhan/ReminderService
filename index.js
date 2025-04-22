const express = require("express");
const bodyParser = require("body-parser");
const { PORT ,REMINDER_BINDING_KEY} = require("./src/config/serverConfig.js");
const { sendBasicEmail } = require("./src/services/email-service.js");
const {subscribeMessage,createChannel}=require("./src/utils/messageQueue.js")
const cron = require("node-cron");
const TicketController=require("./src/controllers/ticket-controller.js")
const emailService=require("./src/services/email-service.js")
const setUpJobs=require("./src/utils/job.js")


const setUpAndStartServer = async () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
 const channel=await createChannel();
 subscribeMessage(channel,emailService.subscribeEvents,REMINDER_BINDING_KEY)
  app.listen(PORT, async () => {
    // sendBasicEmail("support@admin.com","engineervele7@gmail.com","this is a testing email","hey how are you I hope you like the support")
    console.log(`Server is listening PORT ${PORT}🚀`);
    
    setUpJobs();
   
  });
};
setUpAndStartServer();
