var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 5,
    host    :'35.193.31.105',
    port : 3306,
    user : 'root',
    password : 'hi123456'
    	,
    database:'momentdb'    
});

module.exports = pool;