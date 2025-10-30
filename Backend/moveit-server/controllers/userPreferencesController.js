// controllers/userPreferencesController.js

const userPreferencesService = require('../services/userPreferencesService');


// Create new user preferences
exports.createUserPreferences = async (req, res) => {
  try {
    const newPreferences = await userPreferencesService.createUserPreferences(req.body);

    // החזר גם את ההעדפות וגם את התוכנית
    res.status(201).json({
      message: 'Preferences saved and training plan created',
      preferences: newPreferences,
      trainingPlan: trainingPlan,
    });

  } catch (err) {
    res.status(400).json({ message: 'Error creating user preferences', error: err.message });
  }
};

// Create new user preferences
exports.createUserPreferences = async (req, res) => {
  try {
    const newPreferences = await userPreferencesService.createUserPreferences(req.body);
    res.status(201).json(newPreferences);
  } catch (err) {
    res.status(400).json({ message: 'Error creating user preferences', error: err.message });
  }
};

// Update user preferences
exports.updateUserPreferences = async (req, res) => {
  try {
    const updatedPreferences = await userPreferencesService.updateUserPreferences(req.params.userName, req.body);
    if (!updatedPreferences) {
      return res.status(404).json({ message: 'User preferences not found' });
    }
    res.json(updatedPreferences);
  } catch (err) {
    res.status(400).json({ message: 'Error updating user preferences', error: err.message });
  }
};

// Delete user preferences
exports.deleteUserPreferences = async (req, res) => {
  try {
    const deleted = await userPreferencesService.deleteUserPreferences(req.params.userId);
    if (!deleted) {
      return res.status(404).json({ message: 'User preferences not found' });
    }
    res.json({ message: 'User preferences deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user preferences', error: err.message });
  }
};

//get all the prefs
exports.getAllUserPreferences = async (req, res) => {
  try {
    const prefs = await userPreferencesService.getAllUserPreferences();
    res.json(prefs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user preferences by username
exports.getUserPreferencesByUserName = async (req, res) => {
  try {
    const preferences = await userPreferencesService.getUserPreferences(req.params.userName);
    if (!preferences) {
      return res.status(404).json({ message: 'User preferences not found' });
    }
    res.json(preferences);
  } catch (err) {
    res.status(500).json({ message: 'Error getting user preferences' });
  }
};



