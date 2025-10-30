// routes/trainingDaysRoutes.js
const express = require('express'); // Import express

// Import the trainingDaysController to handle training day-related requests
const trainingDaysController = require('../controllers/trainingDaysController');
const router = express.Router(); // Create a new router instance

router.post('/', trainingDaysController.createTrainingDay); // Route to create a new training day   
router.get('/', trainingDaysController.getAllTrainingDays); // Route to get all training days

router.get('/:dayId', trainingDaysController.getTrainingDayById); // Route to get a training day by ID
router.put('/:dayId', trainingDaysController.updateTrainingDay); // Route to update a training day
router.delete('/:dayId', trainingDaysController.deleteTrainingDay); // Route to delete a training day


// Export the router to use in the main app file
module.exports = router;