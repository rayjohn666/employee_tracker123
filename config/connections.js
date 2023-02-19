const mysql = require('mysql2');
require('dotenv').config();


const connection = mysql.createConnection({
    host: 'localhost',
    port: '3001',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

},
console.log(`Connected to the ${process.env.DB_NAME} database.`)
);

connection.connect(function(error){
    if(error) throw error;
});



module.exports = connection;