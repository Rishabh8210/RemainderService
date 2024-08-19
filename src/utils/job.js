const cron = require('node-cron')
const emailService = require('../service/email-service');
const sender = require('../config/mail-config');
const {EMAIL_ID} = require('../config/server-config')
/*
 * 10:00 am 
 * Every 5 minutes
 * We will check their any pending emails which has expexted to be sent by now and its pending 
*/

const setupJobs = () => {
    cron.schedule('*/2 * * * *', async () => {
        const response = await emailService.fetchPendingEmails();
        console.log(response)
        response.forEach((res) => {
            sender.sendMail({
                from: EMAIL_ID,
                to: res.recepientEmail,
                subject: res.subject,
                text: res.content
            }, async (err, info) => {
                if (err) {
                    console.log(err)
                } else {
                    if(res.status != 'Success'){
                        await emailService.updateNotificationTicket(res.id, {status: 'Success'});
                        console.log("Mail sended successfully", info)
                    }else{
                        console.log("Mail is already sended")
                    }
                }
            })
        })
    })
}

module.exports = setupJobs