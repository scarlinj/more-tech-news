const Sequelize = require('sequelize');
const path = require('path');
require('dotenv').config();

let sequelize;

// create connection to our db, pass in your MySQL information for username and password
// use process.env.DB_NAME as local environment variable to hide sensitive data when pushed to Heroku
// Sequelize prefers to work with mysql2 library instead of mysql - not working 2/20/2023.  Use mysql library
// use JawsDB to set up remote database below

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: '0.0.0.0:27017',
  dialect: 'mysql',
  port: 3306
});
}

module.exports = sequelize;
