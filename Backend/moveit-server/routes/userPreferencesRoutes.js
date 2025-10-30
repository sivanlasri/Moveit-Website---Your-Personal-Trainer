// routes/userPreferencesRoutes.js

const express = require('express'); // Import express
const router = express.Router(); // Create a new router instance
const userPreferencesController = require('../controllers/userPreferencesController'); // Import the userPreferencesController

router.post('/', userPreferencesController.createUserPreferences); // Route to create new user preferences
router.get('/', userPreferencesController.getAllUserPreferences);


router.get('/:userName', userPreferencesController.getUserPreferencesByUserName); // Route to get user preferences by user ID
router.put('/:userName', userPreferencesController.updateUserPreferences); // Route to update user preferences
router.delete('/:userName', userPreferencesController.deleteUserPreferences); // Route to delete user preferences


//export the router to use in the main app file
module.exports = router;