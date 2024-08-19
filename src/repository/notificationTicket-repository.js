const { NotificationTicket } = require('../models/index')
class NotificationTicketRepository { 
    create = async(data) => {
        try {
            const response = await NotificationTicket.create(data);
            return response;
        } catch (error) {
            console.log("Something went wrong inside repository layer");
            throw error
        }
    }

    update = async(id, data) => {
        try {
            const response = await NotificationTicket.findByPk(id);
            if(data.status){
                response.status = data.status;
            }
            await response.save();
            return response;
        } catch (error) {
            console.log("Something went wrong inside repository layer");
            throw error
        }
    }

    get = async(timestamps) => {

    }

    getAll = async() => {
        try {
            const response = await NotificationTicket.findAll();
            return response
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}

module.exports = NotificationTicketRepository