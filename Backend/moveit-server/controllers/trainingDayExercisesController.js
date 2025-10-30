// controllers/trainingDaysController.js

const trainingDayExercisesService = require('../services/trainingDayExercisesService');

// Get all training day exercises
exports.getAllTrainingDayExercises = async (req, res) => {
    try {
        const exercises = await trainingDayExercisesService.getAllTrainingDayExercises();
        res.json(exercises);
    } catch (err) {
        res.status(500).json({ message: 'Error getting training day exercises' });
    }
};

// Get training day exercises by day ID
exports.getTrainingDayExercisesByDayId = async (req, res) => {
    try {
        const exercises = await trainingDayExercisesService.getTrainingDayExercisesByDayId(req.params.dayId);
        if (!exercises) {
            return res.status(404).json({ message: 'Training day exercises not found' });
        }
        res.json(exercises);
    } catch (err) {
        res.status(500).json({ message: 'Error getting training day exercises' });
    }
};

// Create new training day exercises
exports.createTrainingDayExercises = async (req, res) => {
    try {
        const newExercises = await trainingDayExercisesService.createTrainingDayExercises(req.body);
        res.status(201).json(newExercises);
    } catch (err) {
        res.status(400).json({ message: 'Error creating training day exercises', error: err.message });
    }
};

// Update training day exercises
exports.updateTrainingDayExercises = async (req, res) => {
    try {
        const updatedExercises = await trainingDayExercisesService.updateTrainingDayExercises(req.params.dayId, req.body);
        if (!updatedExercises) {
            return res.status(404).json({ message: 'Training day exercises not found' });
        }
        res.json(updatedExercises);
    } catch (err) {
        res.status(400).json({ message: 'Error updating training day exercises', error: err.message });
    }
};

// Delete training day exercises
exports.deleteTrainingDayExercises = async (req, res) => {
    try {
        const deleted = await trainingDayExercisesService.deleteTrainingDayExercises(req.params.dayId);
        if (!deleted) {
            return res.status(404).json({ message: 'Training day exercises not found' });
        }
        res.json({ message: 'Training day exercises deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting training day exercises', error: err.message });
    }
};

