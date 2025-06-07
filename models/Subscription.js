const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Branch = require('./branch');

const Subscription = sequelize.define('Subscription', {
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'expired'),
    defaultValue: 'active',
  },
});

// Relationships
Subscription.belongsTo(User);
User.hasMany(Subscription);

Subscription.belongsTo(Branch);
Branch.hasMany(Subscription);

module.exports = Subscription;
