const connections = require("./config/connections.js");
const path = require('path');
const inquirer = require('inquirer');

connections.query(
    'SHOW DATABASES',
    function(err, results, fields) {
        console.log(results);
        console.log(fields);
    }
);

// call once somewhere in the beginning of the app
const cTable = require('console.table');
console.table([
  {
    name: 'foo',
    age: 10
  }, {
    name: 'bar',
    age: 20
  }
]);