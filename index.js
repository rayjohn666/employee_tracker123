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

 // call once somewhere in the beginning of the app
// console.table([
//   {
//     name: 'foo',
//     age: 10
//   }, {
//     name: 'bar',
//     age: 20
//   }
// ]);