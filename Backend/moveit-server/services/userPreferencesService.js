// services/userPreferencesService.js

const UserPreferences = require('../models/user_preferences'); // Import the UserPreferences model

const getUserPreferences = async (username) => { // Function to get user preferences by username
  return await UserPreferences.findOne({ where: { user_name: username } });
};
 
const updateUserPreferences = async (username, preferences) => { // Function to update user preferences
    const userOld = await getUserPreferences(username); // Fetch existing preferences
    return await userOld.update(preferences);
};

const createUserPreferences = async (preferences) => {
  console.log('Received trainingTime:', preferences.trainingTime, typeof preferences.trainingTime);
  return await UserPreferences.create({
    user_name: preferences.userName,
    fitness_level: preferences.fitnessLevel,
    goal: preferences.goal,
    available_days: preferences.availableDays,
    training_time: preferences.trainingTime
  });
};




const deleteUserPreferences = async (username) => { // Function to delete user preferences
  const preferences = await getUserPreferences(username); // Fetch existing preferences
  await preferences.destroy();
  return true;
};

const getAllUserPreferences = async() =>{
  return await UserPreferences.findAll();
}

module.exports = {
  getUserPreferences,
  updateUserPreferences,
  createUserPreferences,
  deleteUserPreferences,
  getAllUserPreferences
};

