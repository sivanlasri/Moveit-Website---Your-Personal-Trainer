// services/trainingDaysService.js
const TrainingDays = require('../models/training_days'); // Import the TrainingDays model

const getAllTrainingDays = async () => { // Function to get all training days
  return await TrainingDays.findAll();
};

const getTrainingDayById = async (dayId) => { // Function to get a training day by its ID
  return await TrainingDays.findByPk(dayId);
};

const createTrainingDay = async (dayData) => { // Function to create a new training day
  return await TrainingDays.create(dayData);
};

const updateTrainingDay = async (dayId, updatedData) => { // Function to update a training day
  const day = await getTrainingDayById(dayId);
    if (!day) return null;
    return await day.update(updatedData);
};

const deleteTrainingDay = async (dayId) => { // Function to delete a training day
  const day = await getTrainingDayById(dayId);
    if (!day) return null;
    await day.destroy();
    return true;
};

module.exports = {
  getAllTrainingDays,
  getTrainingDayById,
  createTrainingDay,
  updateTrainingDay,
  deleteTrainingDay
};