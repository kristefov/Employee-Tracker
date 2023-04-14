const { prompt } = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'registrar_db'
  }
)