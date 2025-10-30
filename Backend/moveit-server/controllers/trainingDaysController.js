// controllers/trainingDaysController.js

const trainingDaysService = require('../services/trainingDaysService');

// Get all training days
exports.getAllTrainingDays = async (req, res) => {
    try {
        const days = await trainingDaysService.getAllTrainingDays();
        res.json(days);
    } catch (err) {
        res.status(500).json({ message: 'Error getting training days' });
    }
};

// Get training day by ID
exports.getTrainingDayById = async (req, res) => {
    try {
        const day = await trainingDaysService.getTrainingDayById(req.params.dayId);
        if (!day) {
            return res.status(404).json({ message: 'Training day not found' });
        }
        res.json(day);
    } catch (err) {
        res.status(500).json({ message: 'Error getting training day' });
    }
};

// Create new training day
exports.createTrainingDay = async (req, res) => {
    try {
        const newDay = await trainingDaysService.createTrainingDay(req.body);
        res.status(201).json(newDay);
    } catch (err) {
        res.status(400).json({ message: 'Error creating training day', error: err.message });
    }
};

// Update training day
exports.updateTrainingDay = async (req, res) => {
    try {
        const updatedDay = await trainingDaysService.updateTrainingDay(req.params.dayId, req.body);
        if (!updatedDay) {
            return res.status(404).json({ message: 'Training day not found' });
        }
        res.json(updatedDay);
    } catch (err) {
        res.status(400).json({ message: 'Error updating training day', error: err.message });
    }
};

// Delete training day
exports.deleteTrainingDay = async (req, res) => {
    try {
        const deleted = await trainingDaysService.deleteTrainingDay(req.params.dayId);
        if (!deleted) {
            return res.status(404).json({ message: 'Training day not found' });
        }
        res.json({ message: 'Training day deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting training day', error: err.message });
    }
};


