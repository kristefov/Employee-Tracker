const mysql = require("mysql2");
// dotenv to hide sensitive information
require('dotenv').config();
// Create a connection to the data base
const db = mysql.createConnection(
  {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = db;
