const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

const UserPreferences = sequelize.define('UserPreferences', {
    user_name: {
        type: DataTypes.STRING(45),
        primaryKey: true,
        allowNull: false,
        unique: true,
        references: {
            model: 'user', 
            key: 'user_name'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    fitness_level: {
        type: DataTypes.ENUM('Beginner', 'Advanced', 'Expert'),
        allowNull: false
    },
    goal: {
        type: DataTypes.ENUM('Cut','Mass','Preservation','Cardio'),
        allowNull: false
    },
    available_days: {
        type: DataTypes.ENUM('1', '2', '3', '4', '5', '6', '7'),
        allowNull: false
    },
    training_time: {
        type: DataTypes.ENUM('20', '30', '45', '60', '90'),
        allowNull: false
    }
}, {
    tableName: 'user_preferences',
    timestamps: false
});

module.exports = UserPreferences;