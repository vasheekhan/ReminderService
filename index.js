const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./src/config/serverConfig.js");
const { sendBasicEmail } = require("./src/services/email-service.js");
const cron = require("node-cron");
const TicketController=require("./src/controllers/ticket-controller.js")
const setUpJobs=require("./src/utils/job.js")


const setUpAndStartServer = async () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.post("/api/v1/tickets",TicketController.create);
  app.listen(PORT, async () => {
    // sendBasicEmail("support@admin.com","engineervele7@gmail.com","this is a testing email","hey how are you I hope you like the support")
    console.log(`Server is listening PORT ${PORT}🚀`);
    
    setUpJobs();
   
  });
};
setUpAndStartServer();
