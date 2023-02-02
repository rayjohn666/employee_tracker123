const connections = require("./config/connections.js");
const path = require('path');
const inquirer = require('inquirer');
const cTable = require('console.table');
const { color, log, red, green, cyan, cyanBright } = require('console-log-colors');


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



basePrompt = () => {
    inquirer.prompt([
        {
            type:  ,
            name:  ,
            message: ,
            choices:  ,

        }
    ])
     console.log(`
     ===============
     
     ===============
     `);
 
     return inquirer.prompt([
         {
             type: 'input',
             name: 'name',
             message: 'What is the name of the employee? (Required)',
             validate: employeeName => {
                 if (employeeName) {
                     return true;
                 } else {
                     console.log('Please enter the name of the employee.');
                     return false;
                 }
             }
         },
         {
             type: 'input',
             name: 'employeeId',
             message: 'Enter your employee ID (Required)',
             validate: employeeId => {
                 if (employeeId) {
                     return true;
                 } else {
                     console.log('Please enter your employee ID.');
                     return false;
                 }
             }
         },
         {
             type: 'input',
             name: 'email',
             message: 'Enter your email. (Required)',
             validate: email => {
                 if (email) {
                     return true;
                 } else {
                     console.log('Please enter email.');
                     return false;
                 }
             }
         },
     
     ]).then(answers => {
         console.log(answers);
         const employee = new Employee(answers.name, answers.employeeId, answers.email);
         employee.type = "employee";
         teamMembers.push(employee);
         promptMenu();
     })
 };
 
 const promptManager = () => {
     console.log(`
     ================
     Add a Manager...
     ================
     `);
     return inquirer.prompt ([
         {
             type: 'input',
             name: 'name',
             message: 'What is your name? (Required)',
             validate: nameInput => {
                 if (nameInput) {
                     return true;
                 } else {
                     console.log('Please enter your name!');
                     return false;
                 }
             }
         },
         {
             type: 'input',
             name: 'employeeId',
             message: 'Enter your employee ID (Required)',
             validate: employeeId => {
                 if (employeeId) {
                     return true;
                 } else {
                     console.log('Please enter your employee ID.');
                     return false;
                 }
             }
         },
         {
             type: 'input',
             name: 'email',
             message: 'Enter your emailaddress... (Required)',
             validate: email => {
                 if (email) {
                     return true;
                 } else {
                     console.log('Please enter your email address.');
                     return false;
                 }
             }
         },
         {
         type: 'input',
         name: 'officeNumber',
         message: 'Enter the office Number. (Required)',
         validate: officeNumber => {
             if (officeNumber) {
                 return true;
             } else {
                 console.log('Please enter the Office number');
                 return false;
             }
         }
     
         },
         
     ]).then(answers => {
         console.log (answers);
         const manager = new Manager(answers.name, answers.employeeId, answers.email, answers.gihubUsername, answers.officeNumber);
         manager.type = "manager";
         teamMembers.push(manager);
         promptMenu();
     })
 };
 
 const promptMenu = () => {
     console.log(`
     ==================================================
     Add a team Member, or Finish building your team...
     ==================================================
     `);
     return inquirer.prompt([
         {
             type: 'list',
             name: 'menu',
             message: 'Select which option you would like to continue with...',
             choices: ['add an engineer', 'add an intern', 'add a manager' , 'finish building my team']
         }])
         .then(userChoice => {
             switch (userChoice.menu) {
                 case "add an engineer":
                     promptEngineer();
                     break;
                 case "add an intern":
                     promptIntern();
                     break;
                 case "add a manager":
                     promptManager();
                     break;
                 default:
                     buildTeam();    
 
             }
         });
 };
 
 const promptEngineer = () => {
     console.log(`
     ===============
     Add a New Engineer
     ===============
     `);
 
     return inquirer.prompt([
         {
             type: 'input',
             name: 'name',
             message: 'What is the name of engineer? (Required)',
             validate: engineerName => {
                 if (engineerName) {
                     return true;
                 } else {
                     console.log('Please enter the name of engineer.');
                     return false;
                 }
             }
         },
         {
             type: 'input',
             name: 'employeeId',
             message: 'Enter your employee ID (Required)',
             validate: employeeId => {
                 if (employeeId) {
                     return true;
                 } else {
                     console.log('Please enter your employee ID.');
                     return false;
                 }
             }
         },
         {
             type: 'input',
             name: 'email',
             message: 'Enter your email. (Required)',
             validate: email => {
                 if (email) {
                     return true;
                 } else {
                     console.log('Please enter email.');
                     return false;
                 }
             }
         },
         {
             type: 'input',
             name: 'githubUsername',
             message: 'Enter your Github username. (Required)',
             validate: githubUsername => {
                 if (githubUsername) {
                     return true;
                 } else {
                     console.log('Please enter your Github username.');
                     return false;
                 }
             }
         },
     ]).then(answers => {
         console.log(answers);
         const engineer = new Engineer(answers.name, answers.employeeId, answers.email, answers.githubUsername);
         engineer.type = "engineer";
         teamMembers.push(engineer);
         promptMenu();
     })
 
     
 };
 
 const promptIntern = () => {
     console.log(`
     ===============
     Add a New Intern
     ===============
     `);
 
     return inquirer.prompt([
         {
             type: 'input',
             name: 'name',
             message: 'What is the name of intern? (Required)',
             validate: internName => {
                 if (internName) {
                     return true;
                 } else {
                     console.log('Please enter the name of engineer.');
                     return false;
                 }
             }
         },
         {
             type: 'input',
             name: 'employeeId',
             message: 'Enter your employee ID (Required)',
             validate: employeeId => {
                 if (employeeId) {
                     return true;
                 } else {
                     console.log('Please enter your employee ID.');
                     return false;
                 }
             }
         },
         {
             type: 'input',
             name: 'email',
             message: 'Enter your email. (Required)',
             validate: email => {
                 if (email) {
                     return true;
                 } else {
                     console.log('Please enter email.');
                     return false;
                 }
             }
         },
         {
             type: 'input',
             name: 'school',
             message: 'Enter your school name. (Required)',
             validate: school => {
                 if (school) {
                     return true;
                 } else {
                     console.log('Please enter your school name.');
                     return false;
                 }
             }
         }
 
     ]).then(answers => {
         console.log(answers);
         const intern = new Intern(answers.name, answers.employeeId, answers.email, answers.school);
         intern.type = "intern";
         teamMembers.push(intern);
         promptMenu();
     })
 };