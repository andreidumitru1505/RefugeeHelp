const mysql = require('mysql2');

const dbConn = mysql
  .createConnection({
    host: "mariadb",
    user: "root",
    database: "RefugeeHelp",
    password: "1234",
    port: 3306
  })
  .on("error", (err) => {
    console.log("Failed to connect to Database - ", err);
  });

module.exports = dbConn;