const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {PORT} = require('./config/server-config')
const NotificationTicketController = require('./controllers/notificationTicker-controller')
const jobs = require('./utils/job');

async function startAndSetupServer(){
    const app = express();
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(cors());
    
    app.post('/notifications', NotificationTicketController.createNotificationTicket)
    app.listen(PORT, () => {
        console.log(`Server is running at PORT ${PORT}`);
        jobs()
    })
}

startAndSetupServer()