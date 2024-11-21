require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '051211',
    database: process.env.DB_NAME || 'dev',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
  },
}
