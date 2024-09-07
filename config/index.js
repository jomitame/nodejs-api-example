const dotenv = require('dotenv');
dotenv.config()

const databaseUser = process.env.DATABASE_USER;
const databasePass = process.env.DATABASE_PASSWORD;
const databaseHost = process.env.DATABASE_HOST;
const databasePort = process.env.DATABASE_PORT;
const databaseName = process.env.DATABASE_NAME;

/*
url format:
mysql://user:password@host:port/dbName
*/

const config = {
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.PORT || 3000,
    databaseURL: `mysql://${databaseUser}:${databasePass}@${databaseHost}:${databasePort}/${databaseName}`,
}

module.exports = config;