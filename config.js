require('dotenv').config();

const config = {
    dbUrl: process.env.DB_URL,
    port: parseInt(process.env.PORT)
}

module.exports = config;