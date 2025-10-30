const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 



const TrainingPlans = sequelize.define('TrainingPlans', {
    training_plans_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    training_plans_goal: {
        type: DataTypes.ENUM('Cut', 'Mass', 'Preservation', 'Cardio'),
        allowNull: false,
        references: {
            model: 'user_preferences', 
            key: 'goal'
        },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT'
    },
    training_plans_name: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    training_plans_level: {
        type: DataTypes.ENUM('Beginner', 'Advanced', 'Expert'),
        allowNull: false,
        references: {
            model: 'user_preferences',
            key: 'fitness_level'
        },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT'
    },
    training_plans_avg_time: {
        type: DataTypes.ENUM(20, 30, 45, 60, 90),
        allowNull: false,
        references: {
            model: 'user_preferences',
            key: 'training_time'
        },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT'
    },
}, {
    tableName: 'training_plans',
    timestamps: false // No createdAt/updatedAt fields

    
});
TrainingPlans.associate = (models) => {
  TrainingPlans.hasMany(models.UserAssignedPlans, {
    foreignKey: 'training_plan_id',
    sourceKey: 'training_plans_id'
  });
};

module.exports = TrainingPlans;
