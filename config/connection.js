const mysql = require("mysql2");

// Create a connection to the data base
const db = mysql.createConnection({
  user: "root",
  password: "123456789",
  database: "registrar_db"
});

module.exports = db;
