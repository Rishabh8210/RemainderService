const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {PORT} = require('./config/server-config')
const app = express();

async function startAndSetupServer(){
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(cors());


    app.listen(PORT, () => {
        console.log(`Server is running at PORT ${PORT}`);
    })
}

startAndSetupServer()