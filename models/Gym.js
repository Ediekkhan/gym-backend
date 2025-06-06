// models/Gym.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Gym = sequelize.define('Gym', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
});

module.exports = Gym;
