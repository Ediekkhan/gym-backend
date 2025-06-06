// models/Branch.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Gym = require('./gym');

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
Branch.belongsTo(Gym, { foreignKey: 'gymId', onDelete: 'CASCADE' });
Gym.hasMany(Branch, { foreignKey: 'gymId' })

module.exports = Branch;
