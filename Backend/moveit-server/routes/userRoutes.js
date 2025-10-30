// routes/userRoutes.js
const express = require('express'); // Import express
// Import the userController to handle user-related requests
const router = express.Router(); // Create a new router instance
const userController = require('../controllers/userController'); // Import the userController

router.get('/', userController.getAllUsers); // Route to get all users
router.post('/', userController.createUser); // Route to create a new user (registration)

router.get('/:username', userController.getUserByUsername); // Route to get a user by username
router.get('/email/:email', userController.getUserByEmail); // Route to get a user by email
router.post('/login', userController.loginUser); // Route to log in a user
router.put('/:username', userController.updateUser); // Route to update user details
router.delete('/:username', userController.deleteUser); // Route to delete a user


module.exports = router; // Export the router to use in the main app file