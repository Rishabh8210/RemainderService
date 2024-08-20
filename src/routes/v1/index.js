const express = require('express');
const router = express.Router();
const {NotificationTicketController} = require('../../controllers/index');
const notificationTicketController = new NotificationTicketController()

router.post('/bookings', notificationTicketController.createNotificationTicket);
router.get('/bookings', notificationTicketController.getAllNotificationTicket)

module.exports = router;