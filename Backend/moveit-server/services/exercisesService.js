// services/exercisesService.js
const Exercises = require('../models/exercises'); // Import the Exercises model

const getAllExercises = async () => { // Function to get all exercises
  return await Exercises.findAll();
};

const getExerciseById = async (exerciseId) => { // Function to get an exercise by its ID
  return await Exercises.findByPk(exerciseId);
};

const createExercise = async (exerciseData) => { // Function to create a new exercise
  return await Exercises.create(exerciseData);
};

const updateExercise = async (exerciseId, updatedData) => { // Function to update an exercise
  const exercise = await getExerciseById(exerciseId);
  if (!exercise) return null;
  return await exercise.update(updatedData);
};

const deleteExercise = async (exerciseId) => { // Function to delete an exercise
  const exercise = await getExerciseById(exerciseId);
  if (!exercise) return null;
  await exercise.destroy();
  return true;
};

module.exports = {
  getAllExercises,
  getExerciseById,
  createExercise,
  updateExercise,
  deleteExercise
};