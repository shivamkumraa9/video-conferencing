const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Conference = require('./conference');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Establish one-to-many relationship
User.hasMany(Conference);
Conference.belongsTo(User);

module.exports = User;
