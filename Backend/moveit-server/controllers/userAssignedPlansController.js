// controllers/userPreferencesController.js

const userAssignedPlansService = require('../services/userAssignedPlansService');

// Get all user assigned plans
exports.getAllUserAssignedPlans = async (req, res) => {
  try {
    const plans = await userAssignedPlansService.getAllUserAssignedPlans();
    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: 'Error getting user assigned plans' });
  }
};

// Get user assigned plans by userName
exports.getUserAssignedPlansByUserName = async (req, res) => {
  try {
    const plans = await userAssignedPlansService.getUserAssignedPlansByUserName(req.params.userName);
    if (!plans) {
      return res.status(404).json({ message: 'User assigned plans not found' });
    }
    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: 'Error getting user assigned plans' });
  }
};

// Create new user assigned plans
exports.createUserAssignedPlans = async (req, res) => {
  try {
    const newPlans = await userAssignedPlansService.createUserAssignedPlans(req.body);
    res.status(201).json(newPlans);
  } catch (err) {
    res.status(400).json({ message: 'Error creating user assigned plans', error: err.message });
  }
};

// Update user assigned plans
exports.updateUserAssignedPlans = async (req, res) => {
  try {
    const updatedPlans = await userAssignedPlansService.updateUserAssignedPlans(req.params.userId, req.body);
    if (!updatedPlans) {
      return res.status(404).json({ message: 'User assigned plans not found' });
    }
    res.json(updatedPlans);
  } catch (err) {
    res.status(400).json({ message: 'Error updating user assigned plans', error: err.message });
  }
};

// Delete user assigned plans
exports.deleteUserAssignedPlans = async (req, res) => {
  try {
    const deleted = await userAssignedPlansService.deleteUserAssignedPlans(req.params.userId);
    if (!deleted) {
      return res.status(404).json({ message: 'User assigned plans not found' });
    }
    res.json({ message: 'User assigned plans deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user assigned plans', error: err.message });
  }
};

