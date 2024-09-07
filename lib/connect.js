const dotenv = require('dotenv');
dotenv.config();

const mysql = require("mysql2");

const databaseUser = process.env.DATABASE_USER;
const databasePass = process.env.DATABASE_PASSWORD;
const databaseHost = process.env.DATABASE_HOST;
const databasePort = process.env.DATABASE_PORT;
const databaseName = process.env.DATABASE_NAME;

// mysql://user:password@host:port/dbName
const databaseURL = `mysql://${databaseUser}:${databasePass}@${databaseHost}:${databasePort}/${databaseName}`;

const connection = mysql.createConnection(databaseURL);

console.log("Connected to database");

module.exports = connection;
