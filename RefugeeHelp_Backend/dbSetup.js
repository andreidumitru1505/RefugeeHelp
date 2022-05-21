
const dbSetup = () => {
    var mysql = require('mysql2');

    var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    port: 3306
    });

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");

        con.query("CREATE DATABASE RefugeeHelp", function (err, result) {
            if (err) throw err;
            console.log("Database created");
        });

        con.query("use RefugeeHelp", function (err, result) {
            if (err) throw err;
            console.log("Connected to database");
        });

        var query = "CREATE TABLE `users` ( `userId` 	INT PRIMARY KEY AUTO_INCREMENT, `email` VARCHAR(255), `name` VARCHAR(255), `phoneNumber` VARCHAR(255))";

        con.query(query, function (err, result) {
            if (err) throw err;
            console.log("Users table created");
        });

        query = "CREATE TABLE `donations` ( `donationId` INT PRIMARY KEY AUTO_INCREMENT, `centerId` INT, `objectId` INT, `description` VARCHAR(255), `quantity` INT,`userId` INT);"


        con.query(query, function (err, result) {
            if (err) throw err;
            console.log("Database created");
        });

        query = "CREATE TABLE `centers` ( `centerId` 	INT PRIMARY KEY AUTO_INCREMENT, `email` VARCHAR(255), `name` VARCHAR(255), `registrationNumber`	INT, `address` VARCHAR(255), `phoneNumber` INT);"

        con.query(query, function (err, result) {
            if (err) throw err;
            console.log("Database created");
        });

        query = "CREATE TABLE `requests` ( `requestId` INT PRIMARY KEY AUTO_INCREMENT, `centerId`	INT, `description` 	VARCHAR(255), `quantity` INT, `status` VARCHAR(255));"

        con.query(query, function (err, result) {
            if (err) throw err;
            console.log("Database created");
        });

        query = "CREATE TABLE `objects` (`objectId` INT PRIMARY KEY AUTO_INCREMENT, `requestId` INT, `isTransport` BOOL, `isDonated` BOOL);"

        con.query(query, function (err, result) {
            if (err) throw err;
            console.log("Database created");
        });

        query = "CREATE TABLE `types` ( `objectId` INT, `type` VARCHAR(255), `description` VARCHAR(255), `requestQuantity` INT, `receivedQuantity` INT);"

        con.query(query, function (err, result) {
            if (err) throw err;
            console.log("Database created");
        });

        query = "ALTER TABLE donations ADD FOREIGN KEY (centerId) REFERENCES centers(centerId);"

        con.query(query, function (err, result) {
            if (err) throw err;
            console.log("Database created");
        });

        query = "ALTER TABLE donations ADD FOREIGN KEY (centerId) REFERENCES centers(centerId);"

        con.query(query, function (err, result) {
            if (err) throw err;
            console.log("Database created");
        });

        query = "ALTER TABLE donations ADD FOREIGN KEY (userId) REFERENCES users(userId);"

        con.query(query, function (err, result) {
            if (err) throw err;
            console.log("Database created");
        });

        query = "ALTER TABLE requests ADD FOREIGN KEY (centerId) REFERENCES centers(centerId);"

        con.query(query, function (err, result) {
            if (err) throw err;
            console.log("Database created");
        });


        query = "ALTER TABLE objects ADD FOREIGN KEY (requestId) REFERENCES requests(requestId);"

        con.query(query, function (err, result) {
            if (err) throw err;
            console.log("Database created");
        });


        query = "ALTER TABLE types ADD FOREIGN KEY (objectId) REFERENCES objects(objectId);"

        con.query(query, function (err, result) {
            if (err) throw err;
            console.log("Database created");
        });

        query = "ALTER TABLE donations ADD FOREIGN KEY (objectId) REFERENCES objects(objectId);"

        con.query(query, function (err, result) {
            if (err) throw err;
            console.log("Database created");
        });

    });

}
module.exports = dbSetup;