const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Conference = sequelize.define('Conference', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
});

// Establish one-to-many relationship
User.hasMany(Conference);
Conference.belongsTo(User);

module.exports = Conference;
