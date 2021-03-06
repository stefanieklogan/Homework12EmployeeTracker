const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3310,
  user: 'root',
  password: 'develop2021!',
  database: 'companyDB',
});