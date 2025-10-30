// routes/trainingDayExercisesRoutes.js
const express = require('express'); // Import express
const router = express.Router(); // Create a new router instance
const trainingDayExercisesController = require('../controllers/trainingDayExercisesController'); // Import the trainingDayExercisesController

// import the trainingDayExercisesController to handle training day exercises-related requests
router.get('/', trainingDayExercisesController.getAllTrainingDayExercises); // Route to get all training day exercises
router.post('/', trainingDayExercisesController.createTrainingDayExercises); // Route to create a new training day exercise

router.get('/:id', trainingDayExercisesController.getTrainingDayExercisesByDayId); // Route to get a training day exercise by ID        
router.put('/:id', trainingDayExercisesController.updateTrainingDayExercises); // Route to update a training day exercise
router.delete('/:id', trainingDayExercisesController.deleteTrainingDayExercises); // Route to delete a training day exercise 

// Export the router to use in the main app file
module.exports = router; 
