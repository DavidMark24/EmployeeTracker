const express = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql");
const consoleTable = require("console.table");
const env = require("dotenv").config() ;

// Express

const app = express();

// Connection

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.db_password ,
  database: "employee_db",
});

// Parse request as JSON

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connetion ID

connection.connect(function (err) {
  if (err) throw err;
  console.log(`Connected as ID ${connection.threadId}`);
  startPrompt();
});

// Initial Execution

function startPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "choice",
        choices: [
          "View All Employees?",
          "View All Employee's By Roles?",
          "View all Emplyees By Deparments",
          "Update Employee",
          "Add Employee?",
          "Add Role?",
          "Add Department?"
        ]
      }
    ])
    .then(function(val) {
      switch (val.choice) {
          case "View All Employees?":
            viewAllEmployees();
          break;
  
        case "View All Employee's By Roles?":
            viewAllRoles();
          break;
        case "View all Emplyees By Deparments":
            viewAllDepartments();
          break;
        
        case "Add Employee?":
              addEmployee();
            break;

        case "Update Employee":
              updateEmployee();
            break;
    
          case "Add Role?":
              addRole();
            break;
    
          case "Add Department?":
              addDepartment();
            break;
  
          }
  })
}

// View Employees 

function viewAllEmployees() {
  connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;", 
  function(err, res) {
    if (err) throw err
    console.table(res)
    startPrompt()
})
}

// View Roles 

function viewAllRoles() {
connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;", 
function(err, res) {
if (err) throw err
console.table(res)
startPrompt()
})
}

// View Departments 

function viewAllDepartments() {
  connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;", 
  function(err, res) {
    if (err) throw err
    console.table(res)
    startPrompt()
  })
}

// Add Role function for Add Employee prompt 

let roleArr = [];

function selectRole() {
  connection.query("SELECT * FROM role" , function(err , res) {
    if (err) throw err
    for (let i= 0; i < res.length; i++) {
      roleArr.push(res[i.title])
      
    }
  })
  return roleArr;
}