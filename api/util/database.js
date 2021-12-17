const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'us-cdbr-east-05.cleardb.net',
  user: 'baea13f2b21899',
  database: 'heroku_489141833e1de1d',
  password: '3394c6d6',
});

module.exports = pool.promise();