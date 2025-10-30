// controllers/exercisesController.js

const express = require('express'); // Import express
const router = express.Router(); // Create a new router instance
const exercisesController = require('../controllers/exercisesController'); // Import the exercisesController

//import the exercisesController to handle exercise-related requests
router.get('/', exercisesController.getAllExercises); // Route to get all exercises 
router.post('/', exercisesController.createExercise); // Route to create a new exercise 

router.get('/:exerciseId', exercisesController.getExerciseById); // Route to get an exercise by ID
router.put('/:exerciseId', exercisesController.updateExercise); // Route to update an exercise
router.delete('/:exerciseId', exercisesController.deleteExercise); // Route to delete an exercise   

// Export the router to use in the main app file
module.exports = router;