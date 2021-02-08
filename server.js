const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql');
const consoleTable = require('console.table');

// Connection 

const connection = mysql.createConnection({
    host: 'localhost',
    port:3306,
    user: 'root',
    password: 'blackmamba24!',
    database: 'employee_db'
});