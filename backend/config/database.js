const { Sequelize } = require('sequelize');

// Initialize the Sequelize instance with your database credentials
const sequelize = new Sequelize('your_database', 'your_username', 'your_password', {
  host: 'localhost',
  dialect: 'postgres',
});

// Export the Sequelize instance
module.exports = sequelize;