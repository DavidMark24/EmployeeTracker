const express = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql");
const consoleTable = require("console.table");
const { start } = require("repl");

// Connection

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "blackmamba24!",
  database: "employee_db",
});

// Parse request as JSON

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connetion ID

connection.connect(function (err) {
  if (err) throw err;
  console.log(`Connected as ID ${connection.threadId}`);
  start();
});

// Initial Execution

function start() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "choice",
        choices: [
          "View All Employees?",
          "View All Employees By Roles?",
          "View all Emplyees By Deparments",
          "Update Employee",
          "Add Employee?",
          "Add Role?",
          "Add Department?",
        ],
      },
    ])
    .then(function (val) {
      switch (val.choices) {
        case "View All Employees?":
          viewAllEmployees();
          break;

        case "View All Employees By Roles?":
          viewAllRoles();
          break;

        case "View All Employees By Department":
          viewAllDepartments();
          break;

          case "Add Employee?" :
            addEmployee();
            break;  

        case "Update Employee?":
          updateEmployee();
          break;
        
        case "Add Role?" :
            addRole() 
            break;
        
        case "Add Department?" :
            addDepartment()
            break;  
              
      }
    });
}
