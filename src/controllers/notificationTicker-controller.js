const EmailService = require('../service/email-service');

async function createNotificationTicket(req, res) {
    try {
        const data = req.body;
        const response = await EmailService.createNotificationTicket(data);
        return res.status(201).json({
            data: response,
            message: 'Succesfully notifiation created',
            status: true,
            err: {}
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            data: {},
            message: 'Not able to create notifiation',
            status: false,
            err: error
        })
    }

}

module.exports = {
    createNotificationTicket
}