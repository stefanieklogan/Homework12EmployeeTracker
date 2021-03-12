const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'develop2021!',
  database: 'companyDB',
});

connection.connect((err) => {
    if (err)
    throw err;
    console.log("connected with ID: " + connection.threadId +"\n");
    start();
});

function start() {
    inquirer.prompt({
        type: "list",
        message: "Welcome to EMPLOYEE TRACKER 2021! Choose from an action below:",
        name: "start",
        choices: ["Add Department","Add Role","Add Employee","Update Employee Role","View Departments","View Roles","View Employees","Remove Employee","EXIT"]
    })
    .then((res) => {
        switch (res.start) {
            case "Add Department":
              addDepartment();
              break;
            case "Add Role":
              addRole();
              break;
            case "Add Employee":
              addEmployee();
              break;
            case "View Departments":
              viewDepartment();
              break;
            case "View Roles":
              viewRoles();
              break;
            case "View Employees":
              viewEmployees();
              break;
            case "Update Employee Role":
              updateEmployee();
              break;
            case "Remove Employee":
              removeEmployee();
              break;
            case "EXIT":
              console.log("Goodbye.")
              connection.end();
              break;
          }
    }) 
}

//ADD DEPARTMENT
function addDepartment() {
    inquirer.prompt({
        type: "input",
        name: "addDepartment",
        message: "Department name:"
       })
    .then((res) => {
        connection.query('INSERT INTO department SET ?', {
            dept_name: res.addDepartment
        });
        console.log("---- Department added ---- ");
    viewDepartment();
    })
}

//VIEW DEPARTMENT
function viewDepartment() {
    connection.query('SELECT * FROM department ORDER BY dept_name',(err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
}

//ADD ROLE
function addRole() {
    inquirer.prompt([
    {
        type: "input",
        name: "addRole",
        message: "Role name:",
    },
    {
        type: "input",
        name: "addSalary",
        message: "Role salary:",
    },
    {
        type: "input",
        name: "addDeptId",
        message: "Role's department ID",
    }
    ])
    .then((res) => {
        connection.query('INSERT INTO role SET ?', {
            role: res.addRole,
            salary: res.addSalary,
            department_id: res.addDeptId
        });
        console.log("---- Role added ---- ");
        viewRoles();
    });
}

//VIEW ROLE
function viewRoles() {
    connection.query('SELECT * FROM role ORDER BY role',(err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
}

//ADD EMPLOYEE
function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "addFirstName",
            message: "First name:",
        },
        {
            type: "input",
            name: "addLastName",
            message: "Last name:",
        },
        {
            type: "input",
            name: "addRoleID",
            message: "Employee role ID",
        },
        {
            type: "input",
            name: "addMgrID",
            message: "Manager ID for employee:",
        }
    ])
    .then((res) => {
        connection.query('INSERT INTO employee SET ?', {
            first_name: res.addFirstName,
            last_name: res.addLastName,
            role_id: res.addRoleID,
            manager_id: res.addMgrID
        });
        console.log("---- Employee added ---- ");
    viewEmployees();
    })
}

//VIEW EMPLOYEE
function viewEmployees() {
    connection.query('SELECT employee_id, first_name, last_name, role FROM employee JOIN role ON employee.role_id = role.role_id ORDER BY first_name',(err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
}

//UPDATE EMPLOYEE ROLE
function  updateEmployee() {
    connection.query('SELECT employee_id, first_name, last_name, role, manager_id AS manager FROM employee JOIN role ON employee.role_id = role.role_id ORDER BY first_name',(err, res) => {
        if (err) throw err;
        console.table(res);

    inquirer.prompt([
        {
            type:'input',
            name:'idToUpdate',
            message:'Employee ID:'
        },
        {
            type:'input',
            name:'newRoleId',
            message:'Desired role ID:'
        },
    ]).then((res) => {
        connection.query('UPDATE employee SET ? WHERE ?', 
        [
            {
            role_id: res.newRoleId,    
            },
            {
            employee_id: res.idToUpdate,
            }
        ], 
        (err, res) => {
            if (err) throw err;
            console.log("---- Employee role updated ---- ");
            viewEmployees();
        }
        );  
    });
});
}


const removeEmployee = () => {
    inquirer.prompt([
            {
                type: "input",
                name: "removeID",
                message: "Employee ID to remove:"
            },
        ]).then((res) => {
            connection.query('DELETE FROM employee WHERE ?', {
                employee_id: res.removeID,
            }),
            (err, res) => {
                if (err) throw err;
                console.log(res);
                start();
            };
        });
}