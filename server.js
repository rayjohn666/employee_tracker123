const connections = require("./config/connections.js");
const path = require("path");
const inquirer = require("inquirer");
const cTable = require("console.table");
const {
  color,
  log,
  red,
  green,
  cyan,
  cyanBright,
} = require("console-log-colors");
const mysql = require("mysql2");
const db = require("./config/connections.js");

basePrompt = () => {
  console.log(`
    ==================================================================================================
    WELCOME to the employee tracker application. Use the arrow keys to navigate the prompted questions.
    ==================================================================================================
    `);
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What option would you like to select?",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add a Department",
          "Add a Role",
          "Add an Employee",
          "Update an Employee Role",
        ],
      },
    ])

    .then((answer) => {
      if (answer.choice == "View All Departments") {
        viewDepartments();
      } else if (answer.choice == "View All Employees") {
        viewEmployee();
      } else if (answer.choice == "View All Roles") {
        viewRoles();
      } else if (answer.choice == "Add a Department") {
        addDepartment();
      } else if (answer.choice == "Add a Role") {
        addRoles();
      } else if (answer.choice == "Add an Employee") {
        addEmployee();
      } else if (answer.choice == "Update an Employee Role") {
        updateEmployeeRoles();
      } else {
        // quit();
        init();
      }
    });
};
// Add Department
function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      name: "department",
      message: "What is the department name of the department you want to add?",
    })
    .then((answer) => {
      db.query(
        "INSERT INTO department SET ?",
        { department_name: answer.department },
        (err, result) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log("Department added.");
          init();
        }
      );
    });
}

// Add Role

function addRoles() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "role_name",
        message: "What is the name of the role you want to add?",
      },

      {
        type: "input",
        name: "salary",
        message: "What is the salary you want to add?",
      },

      {
        type: "input",
        name: "department_id",
        message: "What is the department ID for this role?",
      },
    ])
    .then((innerAnswer) => {
      db.query(
        "INSERT INTO roles SET ?",
        {
          title: innerAnswer.role_name,
          salary: innerAnswer.salary,
          department_id: innerAnswer.department_id,
        },
        (err, result) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log("Role added.");
          init();
        }
      );
    });
}

// Add Employee
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the first name of the employee you want to add?",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is their last name?",
      },
      {
        type: "input",
        name: "role_id",
        message: "What is the employee's role ID?",
      },
      {
        type: "input",
        name: "manager_id",
        message: "What is the employee's manager ID?",
      },
    ])
    .then((answer) => {
      db.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.role_id,
          manager_id: answer.manager_id,
        },
        (err, result) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log("Employee added.");
          init();
        }
      );
    });
}

// Update Employee function
function updateEmployeeRoles() {
  db.query("SELECT * FROM employee", (err, res) => {
    if (err) {
      console.error(err);
      return;
    }
    // Creating variable list of employees to be updated
    let listOfEmployees = res.map((employee) => ({
      name: employee.first_name + " " + employee.last_name,
      value: employee.id,
    }));
  });
}

// Add Employee
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the first name of the employee you want to add?",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the their last name?",
      },
      {
        type: "choice",
        name: "role_id",
        message: "What is the employee's role Id?",
      },
      {
        type: "choice",
        name: "manager_id",
        message: "What is the employees manager ID?",
      },
    ])
    .then((answer) => {
      db.query(
        "INSERT INTO employee SET ?;",
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.role_id,
          manager_id: answer.manager_id,
        },
        (err, result) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log("Added to employees");
          init();
        }
      );
    });
}

// Update Employee function
function updateEmployeeRole() {
  db.query("SELECT * FROM employee", (err, res) => {
    if (err) {
      console.error(err);
      return;
    }
    // Creating variable list of employees to be updated
    let listOfEmployees = res.map((employee) => ({
      name: employee.first_name + " " + employee.last_name,
      value: employee.id,
    }));

    // Prompting user to select employee to update
    inquirer
      .prompt([
        {
          type: "list",
          name: "id",
          message: "Which employee's role would you like to update?",
          choices: listOfEmployees,
        },
      ])
      .then((id) => {
        db.query("SELECT * from role", (err, res) => {
          if (err) {
            console.error(err);
            return;
          }
          let listOfRoles = res.map((role) => ({
            name: role.title,
            value: role.id,
          }));
          inquirer
            .prompt([
              {
                type: "list",
                name: "role_id",
                message: "Which role would you like to select?",
                choices: listOfRoles,
              },
            ])
            .then((answer) => {
              db.query(
                "UPDATE employee SET role_id = ? WHERE id = ?",
                [answer.role_id, id.id],
                (err, res) => {
                  if (err) {
                    console.error(err);
                    return;
                  }

                  console.log("Employee's role Updated");
                  init();
                }
              );
            });
        });
      });
  });
}
// showBanner();
// init();
basePrompt();
addRoles;
function init() {
  basePrompt();
}

init();

function viewDepartments() {
  db.query("SELECT * FROM department", (err, rows) => {
    if (err) {
      console.error(err);
      return;
    }
    console.table(rows);
    init();
  });
}

function viewRoles() {
  db.query("SELECT * FROM roles", (err, rows) => {
    if (err) {
      console.error(err);
      return;
    }
    console.table(rows);
    init();
  });
}

function viewEmployee() {
  db.query("SELECT * FROM employee", (err, rows) => {
    if (err) {
      console.error(err);
      return;
    }
    console.table(rows);
    init();
  });
}
