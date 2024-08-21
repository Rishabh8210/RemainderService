const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {PORT} = require('./config/server-config')
const ApiV1Routes = require('./routes/index');
const jobs = require('./utils/job');
const generateTicketPdf = require('./utils/ticketPdfGenerator')

const emailService = require('./utils/messageQueue');
const {REMAINDER_BINDING_KEY} = require('./config/server-config');


async function startAndSetupServer(){
    const app = express();
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(cors());
    
    app.use('/api', ApiV1Routes);
    const channel = await emailService.createChannel();
    emailService.subscribeMessage(channel, undefined, REMAINDER_BINDING_KEY);
    
    app.listen(PORT, () => {
        console.log(`Server is running at PORT ${PORT}`);
        // jobs()
        // generateTicketPdf({id: 1, name: 'Rishabh Pandey', from: 'Ranchi', to: 'Delhi', date: '22-08-2024', time:'10:10:12', gender:'Male', age:23, phone:'+91 8210399874'})
    })
}

startAndSetupServer()