const amqplib = require('amqplib');
const {EXCHANGE_NAME, MESSAGE_BROKER_URL, EMAIL_ID} = require('../config/server-config')
const generateTicketPdf = require('./ticketPdfGenerator');

const sender = require('../config/mail-config');

const {NotificationTicketService} = require('../service/index')
const notificationTicketService = new NotificationTicketService();
async function createChannel(){
    try {
        const connection = await amqplib.connect(MESSAGE_BROKER_URL);
        const channel = await connection.createChannel()
        await channel.assertExchange(EXCHANGE_NAME, 'direct', false)
        return channel
    } catch (error) {
        console.log('Something went wrong inside message queue')
        throw error
    }
}

async function subscribeMessage(channel, service, binding_key) {
    try {
        const applicationQueue = await channel.assertQueue('QUEUE_NAME');
        channel.bindQueue(applicationQueue.queue, EXCHANGE_NAME, binding_key);
        channel.consume(applicationQueue.queue, async (msg) => {
            console.log('received data');
            console.log(msg.content.toString());

            const messageContent = msg.content.toString();
            const ticketData = JSON.parse(messageContent)
            console.log(ticketData)
            const printingData = {subject: 'Ticket for your travel', content: "Here is your digital ticket please download it", recepientEmail: ticketData.email, notificationTime: ticketData.createdAt};
            
            generateTicketPdf(ticketData);

            const ticketResponse = await notificationTicketService.createNotificationTicket(printingData);
            console.log(ticketResponse);

            sender.sendMail({
                from: EMAIL_ID,
                to: ticketResponse.recepientEmail,
                subject: ticketResponse.subject,
                text: ticketResponse.content,
                attachments: [
                    {
                        filename: 'Ticket.pdf',
                        path:'src/utils/DigitalTicket/Ticket.pdf',
                        contentType: 'application/pdf'
                    }
                ]
            }, async (err, info) => {
                if (err) {
                    console.log(err)
                } else {
                    await notificationTicketService.updateNotificationTicket(ticketResponse.id, {status: 'Success'});
                    console.log("Mail sended successfully", info)
                    channel.ack(msg);
                }
            })

        })
    } catch (error) {
        console.log('Something went wrong inside message queue')
        throw error
    }
}

async function publishMessage(channel, binding_key, message){
    try {
        await channel.assertQueue('QUEUE_NAME')
        await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(message))
    } catch (error) {
        console.log('Something went wrong inside message queue')
        throw error
    }
}

module.exports = {
    createChannel,
    subscribeMessage,
    publishMessage
}