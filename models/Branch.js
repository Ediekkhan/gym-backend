// models/Branch.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Gym = require('./Gym');

const Branch = sequelize.define('Branch', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
  },
});

// Relationships
Branch.belongsTo(Gym);
Gym.hasMany(Branch);

module.exports = Branch;
