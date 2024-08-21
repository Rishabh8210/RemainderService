const dotenv = require('dotenv')
dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    EMAIL_ID: process.env.EMAIL_ID,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    EXCHANGE_NAME: process.env.EXCHANGE_NAME,
    MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
    REMAINDER_BINDING_KEY: process.env.REMAINDER_BINDING_KEY
}