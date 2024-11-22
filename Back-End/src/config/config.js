require('dotenv').config();

const config = {
    username: process.env.MYSQLUSER || 'root',
    password: process.env.MYSQLPASSWORD || '051211',
    database: process.env.MYSQLDATABASE || 'dev',
    host: process.env.MYSQLHOST || 'localhost',
    port: process.env.MYSQLPORT || 3306,
    dialect: 'mysql',
  };

module.exports = {
  development: config,
  test: config,
  production: config,
}


