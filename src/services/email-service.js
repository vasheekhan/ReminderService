const sender = require("../config/emailConfig");
const TicketRepository = require("../repository/ticket-repository");
const repo = new TicketRepository();
const sendBasicEmail = async (mailFrom, mailTo, mailSubject, mailBody) => {
  try {
    const response = sender.sendMail({
      from: mailFrom,
      to: mailTo,
      subject: mailSubject,
      text: mailBody,
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
const fetchPendingEmails = async (timestamps) => {
  try {
   
    const response = await repo.get({status:"PENDING"});
    return response;
  } catch (error) {
    console.log(error);
  }
};
const createNotification=async (data)=>{
    try {
  
        const response=await repo.create(data);
        console.log("chal gya bhai dont worry ")
        return response;
    } catch (error) {
       console.log(error); 
    }
}
const updateTicket=async (ticketId,data)=>{
  try {
const response=await repo.update(ticketId,data);
return response;
  } catch (error) {
    console.log(error);
  }
}
const subscribeEvents=async (payload)=>{
  let service=payload.service;
  let data=payload.data
  switch(service){
    case "CREATE_TICKET":
      await createNotification(data);
      break;
    case "SEND_BASIC_EMAIL":
      await sendBasicEmail(data);
      break;
    default:
      console.log("NO valid event recieved");
      break;

  }
}
module.exports = {
  sendBasicEmail,
  fetchPendingEmails,
  createNotification,
  updateTicket,
  subscribeEvents
};
