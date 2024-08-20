const cron = require('node-cron')
const {NotificationTicketService} = require('../service/index');
const sender = require('../config/mail-config');
const {EMAIL_ID} = require('../config/server-config')
/*
 * 10:00 am 
 * Every 5 minutes
 * We will check their any pending emails which has expexted to be sent by now and its pending 
*/
const emailService = new NotificationTicketService();
const setupJobs = () => {
    cron.schedule('*/1 * * * *', async () => {
        const response = await emailService.fetchAllNotificationTicket({status: 'Pending', notificationTime: new Date()});
        console.log(response)
        response.forEach((res) => {
            if(res.status != 'Success'){
                sender.sendMail({
                    from: EMAIL_ID,
                    to: res.recepientEmail,
                    subject: res.subject,
                    text: res.content
                }, async (err, info) => {
                    if (err) {
                        console.log(err)
                    } else {
                        await emailService.updateNotificationTicket(res.id, {status: 'Success'});
                        console.log("Mail sended successfully", info)
                    }
                })
            }else{
                console.log("Mail is already sended")
            }
        })
    })
}

module.exports = setupJobs