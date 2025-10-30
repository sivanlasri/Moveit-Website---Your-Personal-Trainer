const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

const User = sequelize.define('User', {
  user_name: {
    type: DataTypes.STRING(45),
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  full_name: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  phone: {
    type: DataTypes.STRING(11),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  gender: {
    type: DataTypes.ENUM('Male', 'Female'),
    allowNull: false
  },
  birthday: {
    type: DataTypes.STRING(45),
    allowNull: false
  }
}, {
  tableName: 'users',
  timestamps: false 
});

module.exports = User;