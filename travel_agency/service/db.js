const mysql = require('mysql2');
const config = require('./conf.json');

console.log("You are currently connected to DB with following config:\n", config)

var con = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    insecureAuth: config.insecureAuth
});

module.exports = con;