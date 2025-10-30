const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

const TrainingDayExercises = sequelize.define('TrainingDayExercises', {
    training_day_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'training_days', 
            key: 'training_day_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    exercise_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'exercises', 
            key: 'ex_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    training_day_exercises_sets: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    training_day_exercises_reps: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    order_in_day: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'training_day_exercises',
    timestamps: false // No createdAt/updatedAt fields
});

module.exports = TrainingDayExercises;