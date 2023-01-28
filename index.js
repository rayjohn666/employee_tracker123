const connections = require("./config/connections.js");

connections.query(
    'SHOW DATABASES',
    function(err, results, fields) {
        console.log(results);
        console.log(fields);
    }
);