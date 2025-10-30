// services/userAssignedPlansService.js
const UserAssignedPlans = require('../models/user_assigned_plans'); // Import the UserAssignedPlans model

const getUserAssignedPlans = async (username) => { // Function to get assigned plans for a user
  return await UserAssignedPlans.findAll({ where: { user_assigned: username } });
};

const createUserAssignedPlans = async (username, planId) => { // Function to assign a plan to a user
  return await UserAssignedPlans.create({ user_assigned: username, training_plans_id: planId });
};

const deleteUserAssignedPlans = async (username, planId) => { // Function to remove a plan from a user
  return await UserAssignedPlans.destroy({
    where: { user_assigned: username, training_plans_id: planId }
  });
};

const getAllAssignedPlans = async () => { // Function to get all assigned plans
  return await UserAssignedPlans.findAll();
};

const updateUserAssignedPlans = async (username, planId, newPlanId) => { // Function to update a user's assigned plan
  return await UserAssignedPlans.update(
    { training_plans_id: newPlanId },
    { where: { user_assigned: username, training_plans_id: planId } }
  );
};

exports.getPlanByUserName = async (username) => {
  return await UserAssignedPlans.findOne({ where: { user_assigned: username } });
};

exports.assignPlanToUser = async (username, planId) => {
  return await UserAssignedPlans.create({
    training_plan_id: planId,
    user_assigned: username
  });
};

module.exports = {
  getUserAssignedPlans,
  createUserAssignedPlans,
  deleteUserAssignedPlans,
  getAllAssignedPlans,
  updateUserAssignedPlans
};
