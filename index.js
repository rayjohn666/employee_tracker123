const connections = require("./config/connections.js");
const path = require('path');
const inquirer = require('inquirer');
const cTable = require('console.table');
const express = require('express');
const { color, log, red, green, cyan, cyanBright } = require('console-log-colors');

const PORT = process.env.PORT || 3001;
const app = express();

connections.query(
    'SHOW DATABASES',
    function(err, results, fields) {
        console.log(results);
        console.log(fields);
    }
);

const connect = mysql.createConnection(
    {
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST
    },
);

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

basePrompt = () => {
    console.log(`
    ==================================================================================================
    WELCOME to the employee tracker application. Use the arrow keys to navigate the prompted questions.
    ==================================================================================================
    `);
    inquirer.prompt([
        {
            type: "list" ,
            name:  "choice",
            message:"What option would you like to select?" ,
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employess',
                'Add a Department',
                'Add a Role',
                'Add an Employee',
                'Update an Employee Role'
            ]

        }
    ])
}



  then(answer => {
    if (answer.choice == 'View All Departments') {
        viewDepartments();

    } else if (answer.choice == 'View All Employees') {
        viewEmployee();

    } else if (answer.choice == 'View All Roles') {
        viewRoles();

    } else if (answer.choice == 'Add a Department') {
        addDepartment();

    } else if (answer.choice == 'Add a Role') {
        addRole();

    } else if (answer.choice == 'Add an Employee') {
        addEmployee();

    } else if (answer.choice == 'Update an Employee Role') {
        updateEmployeeRole();

    } else {
        // quit();
        init();
    }
})


// Add Employee
function addEmployee() {
    inquirer.prompt([{
        type: 'input',
        name: 'first_name',
        message: 'What is the first name of the employee you want to add?'
    },
    {
        type: 'input',
        name: 'last_name',
        message: 'What is the their last name?',
    },
    {
        type: 'choice',
        name: 'role_id',
        message: "What is the employee's role Id?",
        
    },
    {
        type: 'choice',
        name: 'manager_id',
        message: "What is the employees manager ID?",
    },
    ])
        .then(answer => {
            db.query("INSERT INTO employee SET ?;", { first_name: answer.first_name, last_name: answer.last_name, 
                role_id: answer.role_id, manager_id: answer.manager_id }, (err, result) => {

                if (err) {
                    console.error(err);
                    return;
                }
                console.log('Added to employees');
                init();
            })
        });
}

//  Update Employee function 
function updateEmployeeRole() {
    db.query('SELECT * FROM employee', (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
// ------  creating variable list of employees to be updated ------
        let listOfEmployees = res.map(employee => (
                {
                    name: employee.first_name + ' ' + employee.last_name,
                    value: employee.id
                }
            ));

        inquirer.prompt([
            {
                type: 'list',
                name: 'id',
                message: "Which employee's role would you like to update?",
                choices: listOfEmployees
            }
        ]).then((id) => {
            db.query('SELECT * from role', (err, res) => {
                if (err) {
                    console.error(err);
                    return;
                }
                let listOfRoles = res.map(role => (
                    {
                        name: role.title,
                        value: role.id
                    }
                ))
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'role_id',
                        message: "Which role would you like to select?",
                        choices: listOfRoles
                    }
                ]).then((answer) => {
                    db.query('UPDATE employee SET role_id = ? WHERE id = ?', [answer.role_id, id.id], (err, res) => {
                        if (err) {
                            console.error(err);
                            return;
                        }

                        console.log("Employee's role Updated");
                        init();
                    });
                });
            });
        });
    });
}
showBanner();
init();
