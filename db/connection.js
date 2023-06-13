const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "employee_tracker_db",
  },
  console.log(`Connected to employee_tracker_db`)
);

module.exports = db;
