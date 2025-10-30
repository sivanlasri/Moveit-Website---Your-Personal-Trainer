// routes/userAssignedPlansRoutes.js
const express = require('express'); // Import express

const router = express.Router(); // Create a new router instance
const userAssignedPlansController = require('../controllers/userAssignedPlansController'); // Import the userAssigned

// controller 
router.get('/', userAssignedPlansController.getAllUserAssignedPlans); // Route to get all user assigned plans
router.post('/', userAssignedPlansController.createUserAssignedPlans); // Route to create new user assigned plans


router.get('/:userId', userAssignedPlansController.getUserAssignedPlansByUserName); // Route to get user assigned plans by user ID
router.put('/:userId', userAssignedPlansController.updateUserAssignedPlans); // Route to update user assigned plans
router.delete('/:userId', userAssignedPlansController.deleteUserAssignedPlans); // Route to delete user assigned plans

// Export the router to use in the main app file
module.exports = router;