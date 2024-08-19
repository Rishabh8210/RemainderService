const sender = require('../config/mail-config');

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

module.exports = {
    sendBasicMail
}