const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {PORT} = require('./config/server-config')
const ApiV1Routes = require('./routes/index');
const jobs = require('./utils/job');

async function startAndSetupServer(){
    const app = express();
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(cors());
    
    app.use('/api', ApiV1Routes);
    
    app.listen(PORT, () => {
        console.log(`Server is running at PORT ${PORT}`);
        jobs()
    })
}

startAndSetupServer()