// services/trainingDaysService.js
const TrainingDays = require('../models/training_day_exercises'); // Import the TrainingDays model

const getAllTrainingDayExercises = async () => { // Function to get all training days
  return await TrainingDays.findAll();
};

const getTrainingDayExercisesByDayId = async (dayId) => { // Function to get a training day by its ID
  return await TrainingDays.findByPk(dayId);
};

const createTrainingDayExercises = async (dayData) => { // Function to create a new training day
  return await TrainingDays.create(dayData);
};

const updateTrainingDayExercises = async (dayId, updatedData) => { // Function to update a training day
  const day = await getTrainingDayById(dayId);
    if (!day) return null;
    return await day.update(updatedData);
};

const deleteTrainingDayExercises = async (dayId) => { // Function to delete a training day
  const day = await getTrainingDayById(dayId);
    if (!day) return null;
    await day.destroy();
    return true;
};

module.exports = {
  getAllTrainingDayExercises,
  getTrainingDayExercisesByDayId,
  createTrainingDayExercises,
  updateTrainingDayExercises,
  deleteTrainingDayExercises
};