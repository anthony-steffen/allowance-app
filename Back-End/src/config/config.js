require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: database_development || 'dev',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
  },
}
