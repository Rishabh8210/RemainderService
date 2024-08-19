const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {PORT} = require('./config/server-config')


async function startAndSetupServer(){
    const app = express();
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(cors());
    
    
    app.listen(PORT, () => {
        console.log(`Server is running at PORT ${PORT}`);
    })
}

startAndSetupServer()