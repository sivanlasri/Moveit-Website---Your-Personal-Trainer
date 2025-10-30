// controllers/exercisesController.js

const exercisesService = require('../services/exercisesService');

// Get all exercises
exports.getAllExercises = async (req, res) => {
    try {
        const exercises = await exercisesService.getAllExercises();
        res.json(exercises);
    } catch (err) {
        res.status(500).json({ message: 'Error getting exercises' });
    }
};

// Get exercise by ID
exports.getExerciseById = async (req, res) => {
    try {
        const exercise = await exercisesService.getExerciseById(req.params.exerciseId);
        if (!exercise) {
            return res.status(404).json({ message: 'Exercise not found' });
        }
        res.json(exercise);
    } catch (err) {
        res.status(500).json({ message: 'Error getting exercise' });
    }
};

// Create new exercise
exports.createExercise = async (req, res) => {
    try {
        const newExercise = await exercisesService.createExercise(req.body);
        res.status(201).json(newExercise);
    } catch (err) {
        res.status(400).json({ message: 'Error creating exercise', error: err.message });
    }
};

// Update exercise
exports.updateExercise = async (req, res) => {
    try {
        const updatedExercise = await exercisesService.updateExercise(req.params.exerciseId, req.body);
        if (!updatedExercise) {
            return res.status(404).json({ message: 'Exercise not found' });
        }
        res.json(updatedExercise);
    } catch (err) {
        res.status(400).json({ message: 'Error updating exercise', error: err.message });
    }
};

// Delete exercise
exports.deleteExercise = async (req, res) => {
    try {
        const deleted = await exercisesService.deleteExercise(req.params.exerciseId);
        if (!deleted) {
            return res.status(404).json({ message: 'Exercise not found' });
        }
        res.json({ message: 'Exercise deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting exercise', error: err.message });
    }
};

