// routes/trainingPlansRoutes.js
const express = require('express'); // Import express

//import the trainingPlansController to handle training plan-related requests
const trainingPlansController = require('../controllers/trainingPlansController');  
const router = express.Router(); // Create a new router instance

// controller methods for training plans
router.get('/category/:category', trainingPlansController.getTrainingPlansByCategory); // Route to get training plans by category
router.get('/byLevel/:level', trainingPlansController.getTrainingPlansByLevel); // Route to get training plans by difficulty level
router.get('/byAverageTime/:averageTime', trainingPlansController.getTrainingPlansByAverageTime); // Route to get training plans by average time
router.get('/byGoal/:goal', trainingPlansController.getTrainingPlansByGoal); // Route to get training plans by goal


router.get('/', trainingPlansController.getAllTrainingPlans); // Route to get all training plans
router.post('/', trainingPlansController.createTrainingPlan); // Route to create a new training plan

router.get('/:planId', trainingPlansController.getTrainingPlanById); // Route to get a training plan by ID
router.put('/:planId', trainingPlansController.updateTrainingPlan); // Route to update a training plan
router.delete('/:planId', trainingPlansController.deleteTrainingPlan); // Route to delete a training

//export the router to use in the main app file
module.exports = router;

