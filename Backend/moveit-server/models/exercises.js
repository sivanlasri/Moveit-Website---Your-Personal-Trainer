const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

const Exercises = sequelize.define('Exercises', {
    ex_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    ex_name: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    ex_desc: {
        type: DataTypes.TEXT
    },
    ex_level: {
        type: DataTypes.ENUM('Beginner', 'Advanced', 'Expert'),
        allowNull: false, 
        references: { 
            model: 'user_preferences', 
            key: 'fitness_level'
        },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT'
    },
    ex_duration: {
        type: DataTypes.INTEGER, // Duration in minutes
        allowNull: false
    },
    GIF_url: {
        type: DataTypes.STRING(2048),
        allowNull: true
    },
    ex_category: {
        type: DataTypes.ENUM('Biceps', 'Triceps', 'Chest', 'Legs', 'Abs', 'Core', 'Back'),
        allowNull: false
    }
}, {
    tableName: 'exercises',
    timestamps: false // No createdAt/updatedAt fields
});

module.exports = Exercises;