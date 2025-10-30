// controllers/trainingPlansController.js

const userPreferencesService = require('../services/userPreferencesService');
const userAssignedPlansService = require('../services/userAssignedPlansService');


const User = require('../models/user'); // <- תוסיף את זה!
const UserPreferences = require('../models/user_preferences'); // <- כנ"ל אם צריך
const TrainingPlans = require('../models/training_plans');
const UserAssignedPlans = require('../models/user_assigned_plans');

// ואם אתה משתמש בפונקציה buildFullPlan מ־service:
const { buildFullPlan } = require('../services/trainingPlansService');

// Get all training plans
exports.getAllTrainingPlans = async (req, res) => {
  try {
    const plans = await trainingPlansService.getAllTrainingPlans();
    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: 'Error getting training plans' });
  }
};

// Get training plan by ID
exports.getTrainingPlanById = async (req, res) => {
  try {
    const plan = await trainingPlansService.getTrainingPlanById(req.params.planId);
    if (!plan) {
      return res.status(404).json({ message: 'Training plan not found' });
    }
    res.json(plan);
  } catch (err) {
    res.status(500).json({ message: 'Error getting training plan' });
  }
};

// Create new training plan
exports.createTrainingPlan = async (req, res) => {
  try {
    const newPlan = await trainingPlansService.createTrainingPlan(req.body);
    res.status(201).json(newPlan);
  } catch (err) {
    res.status(400).json({ message: 'Error creating training plan', error: err.message });
  }
};

// Update training plan
exports.updateTrainingPlan = async (req, res) => {
  try {
    const updatedPlan = await trainingPlansService.updateTrainingPlan(req.params.planId, req.body);
    if (!updatedPlan) {
      return res.status(404).json({ message: 'Training plan not found' });
    }
    res.json(updatedPlan);
  } catch (err) {
    res.status(400).json({ message: 'Error updating training plan', error: err.message });
  }
};

// Delete training plan
exports.deleteTrainingPlan = async (req, res) => {
  try {
    const deleted = await trainingPlansService.deleteTrainingPlan(req.params.planId);
    if (!deleted) {
      return res.status(404).json({ message: 'Training plan not found' });
    }
    res.json({ message: 'Training plan deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting training plan', error: err.message });
  }
};


// get by category
exports.getTrainingPlansByCategory = async (req, res) => {
  try {
    const plans = await trainingPlansService.getTrainingPlansByCategory(req.params.category);
    if (!plans || plans.length === 0) {
      return res.status(404).json({ message: 'No training plans found for this category' });
    }
    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: 'Error getting training plans by category', error: err.message });
  }
};

// get by goal
exports.getTrainingPlansByGoal = async (req, res) => {
  try {
    const plans = await trainingPlansService.getTrainingPlansByGoal(req.params.goal);
    if (!plans || plans.length === 0) {
      return res.status(404).json({ message: 'No training plans found for this goal' });
    }
    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: 'Error getting training plans by goal', error: err.message });
  }
};

// get by avarage time
exports.getTrainingPlansByAverageTime = async (req, res) => {
  try {
    const plans = await trainingPlansService.getTrainingPlansByAverageTime(req.params.averageTime);
    if (!plans || plans.length === 0) {
      return res.status(404).json({ message: 'No training plans found for this average time' });
    }
    res.json(plans);
  }
    catch (err) {
        res.status(500).json({ message: 'Error getting training plans by average time', error: err.message });
    }
};

// get by level
exports.getTrainingPlansByLevel = async (req, res) => {
  try {
    const plans = await trainingPlansService.getTrainingPlansByLevel(req.params.level);
    if (!plans || plans.length === 0) {
      return res.status(404).json({ message: 'No training plans found for this level' });
    }
    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: 'Error getting training plans by level', error: err.message });
  }
};





