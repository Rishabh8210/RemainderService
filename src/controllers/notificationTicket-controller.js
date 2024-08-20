const {NotificationTicketService} = require('../service/index');
const {StatusCodes} = require('http-status-codes');
class NotificationTicketController {
    constructor(){
        this.notificationTicketService = new NotificationTicketService()
    }
    createNotificationTicket = async(req, res) => {
        try {
            const data = req.body;
            const response = await this.notificationTicketService.createNotificationTicket(data);
            return res.status(StatusCodes.CREATED).json({
                data: response,
                message: 'Succesfully notifiation created',
                status: true,
                err: {}
            })
        } catch (error) {
            console.log(error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                data: {},
                message: 'Not able to create notifiation',
                status: false,
                err: error
            })
        }
    }
    getAllNotificationTicket = async(req,res) => {
        try {
            const response = await this.notificationTicketService.fetchAllNotificationTicket(req.body);
            return res.status(StatusCodes.OK).json({
                data: response,
                status: true,
                message: 'Successfully fetched all the notification tickets',
                err: {}
            })
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                data: {},
                status: false,
                message: 'Not able to fetched notification tickets',
                err: error
            })
        }
    } 
}

module.exports = NotificationTicketController