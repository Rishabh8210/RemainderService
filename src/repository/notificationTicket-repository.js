const { NotificationTicket } = require('../models/index')
const {Op} = require('sequelize')
class NotificationTicketRepository { 
    
    #createFilter(filterData){
        let filter = {}
        if(filterData.status){
            filter.status = filterData.status;
        }
        if(filterData.notificationTime){
            filter.notificationTime = {[Op.lte]: filterData.notificationTime}
        }
        console.log(filter)
        return filter;
    }
    
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

    get = async(id) => {
        try{
            const response = await NotificationTicket.findByPk(id);
            return response;
        }catch(error){
            console.log("Something went wrong inside repository layer");
            throw error;
        }
    }

    getAll = async(filter) => {
        try {
            const filterData = this.#createFilter(filter);
            const response = await NotificationTicket.findAll({
                where: filterData
            });
            return response
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}

module.exports = NotificationTicketRepository