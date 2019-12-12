const mysql = require('mysql2')

const pool = mysql.createPool({
    host : "localhost",
    user : "root",
    database : "node-complete",
    password : "mysqlroot"
})

module.exports = pool.promise();