const mysql = require('mysql');

const connection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'ethercubes'
});

connection.connect();

module.exports = connection;