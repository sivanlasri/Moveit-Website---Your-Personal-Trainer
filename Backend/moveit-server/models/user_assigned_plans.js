const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 



const UserAssignedPlans = sequelize.define('UserAssignedPlans', {
    training_plans_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'training_plans', 
            key: 'training_plans_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    user_assigned: {
        type: DataTypes.STRING(45),
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'users', 
            key: 'user_name'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
}, {
    tableName: 'user_assigned_plans',
    timestamps: false // No createdAt/updatedAt fields
});

UserAssignedPlans.associate = (models) => {
  UserAssignedPlans.belongsTo(models.TrainingPlans, {
    foreignKey: 'training_plan_id',
    targetKey: 'training_plans_id'
  });
};

module.exports = UserAssignedPlans;