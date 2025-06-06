const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Payment = sequelize.define('Payment', {
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  method: {
    type: DataTypes.ENUM('card', 'cash'),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending',
  },
});

// Relationships
Payment.belongsTo(User);
User.hasMany(Payment);

module.exports = Payment;
