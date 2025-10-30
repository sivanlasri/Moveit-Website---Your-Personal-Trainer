const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

const TrainingDays = sequelize.define('TrainingDays', {
    training_day_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    training_plans_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'training_plans', 
            key: 'training_plans_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    training_days_day_number: {
        type: DataTypes.ENUM('1', '2', '3', '4', '5', '6', '7'),
        allowNull: false
    },
    training_days_day_name: {
        type: DataTypes.STRING(45),
        allowNull: false
    }
}, {
    tableName: 'training_days',
    timestamps: false // No createdAt/updatedAt fields
});

module.exports = TrainingDays;
   