require('dotenv').config();

const config = {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '051211',
    database: process.env.DB_NAME || 'dev',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
  };

module.exports = {
  development: config,
  test: config,
  production: config,
}


