const mysql = require('mysql2')

const pool = mysql.createPool({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORDITB,
    database: process.env.DB_NAME,
    port: process.env.BD_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection((err, conn) => {
    if(err) 
        console.log(err)
    else
        console.log("Conectado ao Dados Banco")
})

module.exports = pool.promise()
