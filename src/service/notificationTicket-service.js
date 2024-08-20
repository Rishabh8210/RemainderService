const sender = require('../config/mail-config');
const {NotificationTicketRepository} = require('../repository/index')

class NotificationTicketService { 
    constructor(){
        this.notificationTicketRepository = new NotificationTicketRepository();
    }

    sendBasicMail = (emailfrom, emailTo, emailSubject, emailBody) => {
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
        
    createNotificationTicket = async(data) => {
        try {
            const response = await this.notificationTicketRepository.create(data);
            return response;
        } catch (error) {
            console.log("Something went wrong inside service layer")
            throw error
        }
    }
    
    updateNotificationTicket = async(id, data) => {
        try {
            const response = await this.notificationTicketRepository.update(id, data);
            return response;
        } catch (error) {
            console.log("Something went wrong inside service layer")
            throw error
        }
    }
    
    fetchAllNotificationTicket = async(filter) => {
        try {
            const response = await this.notificationTicketRepository.getAll(filter);
            return response
        } catch (error) {
            console.log("Something went wrong inside service layer")
            throw error
        }
    }
}

module.exports = NotificationTicketService