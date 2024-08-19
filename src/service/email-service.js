const sender = require('../config/mail-config');
const NotificationTicketRepository = require('../repository/notificationTicket-repository')
const notificationTicketRepository = new NotificationTicketRepository();
const sendBasicMail = (emailfrom, emailTo, emailSubject, emailBody) => {
    console.log(emailfrom, emailTo, emailSubject, emailBody)
    sender.sendMail({
        from: emailfrom,
        to: emailTo,
        subject: emailSubject,
        text: emailBody
    }, (err, info) => {
        if(err){
            console.log(err)
        } else {
            console.log(info)
        }
    })

}

const fetchPendingEmails = async(timestamps) => {
    try {
        const response = await notificationTicketRepository.getAll();
        return response
    } catch (error) {
        console.log("Something went wrong inside service layer")
        throw error
    }
}

const createNotificationTicket = async(data) => {
    try {
        const response = await notificationTicketRepository.create(data);
        return response;
    } catch (error) {
        console.log("Something went wrong inside service layer")
        throw error
    }
}

const updateNotificationTicket = async(id, data) => {
    try {
        const response = await notificationTicketRepository.update(id, data);
        return response;
    } catch (error) {
        console.log("Something went wrong inside service layer")
        throw error
    }
}

module.exports = {
    sendBasicMail,
    fetchPendingEmails,
    createNotificationTicket,
    updateNotificationTicket
}