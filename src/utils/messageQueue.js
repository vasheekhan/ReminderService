const amqplib=require("amqplib");
const {createNotification}=require("../services/email-service")
const {MESSAGE_BROKER_URL,EXCHANGE_NAME,REMINDER_BINDING_KEY}=require("../config/serverConfig")
const createChannel=async()=>{
    try {
        const connection=await amqplib.connect(MESSAGE_BROKER_URL);
        const channel=await connection.createChannel();
        await channel.assertExchange(EXCHANGE_NAME,"direct",false);
        return channel; 
    } catch (error) {
        throw error;
    }

}
const subscribeMessage=async (channel,service,bindingKey)=>{
    try {
        const applicationQueue=await channel.assertQueue("QUEUE_NAME");
        await channel.bindQueue(applicationQueue.queue, EXCHANGE_NAME, REMINDER_BINDING_KEY);

        channel.consume(applicationQueue.queue, async(msg) => {
            console.log("received message");

            console.log(msg.content.toString());
            const payload=JSON.parse(msg.content.toString())
            console.log("data Playload +++++",payload)
           await createNotification(payload);
            channel.ack(msg);
        });
    } catch (error) {
        throw error;
    }

}
const publishMessage=async (channel,bindingKey,message)=>{
    try {
        await channel.assertQueue("QUEUE_NAME");
      await channel.publish(EXCHANGE_NAME,bindingKey,Buffer.from(message));  
    } catch (error) {
        throw error;
    }
}
module.exports={
    createChannel,
    subscribeMessage,
    publishMessage
}