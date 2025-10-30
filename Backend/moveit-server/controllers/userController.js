// controllers/userController.js
const userService = require('../services/userService');

// קבלת כל המשתמשים
exports.getAllUsers = async (req, res) => { 
  try {
    const users = await userService.getAllUsers();

    res.json(users);
  } catch (err) {
         console.error("❌ Error in getAllUsers:", err.message);
         console.error("📄 Stack Trace:", err.stack);
         res.status(500).json({ message: 'Error getting users' });
      }
};

// קבלת משתמש לפי שם משתמש
exports.getUserByUsername = async (req, res) => {
  try {
    const user = await userService.getUserByUsername(req.params.username);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error getting user' });
  }
};

// קבלת משתמש לפי אימייל
exports.getUserByEmail = async (req, res) => {
  try {
    const user = await userService.getUserByEmail(req.params.email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error getting user' });
  }
}

// יצירת משתמש חדש (הרשמה)
exports.createUser = async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: 'Error creating user', error: err.message });
  }
};

// התחברות
exports.loginUser = async (req, res) => {
  try {
    const { user_name, password } = req.body;
    const user = await userService.loginUser(user_name, password);
    if (!user) {
      return res.status(401).json({ message: 'User not found or incorrect password' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
};

// עדכון משתמש
exports.updateUser = async (req, res) => {
  try {
    const updated = await userService.updateUser(req.params.username, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'User nor found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Error updating user', error: err.message });
  }
};

// מחיקת משתמש
exports.deleteUser = async (req, res) => {
  try {
    const success = await userService.deleteUser(req.params.username);
    if (!success) {
      return res.status(404).json({ message: 'Use not found' });
    }
    res.json({ message: 'User deleted succesfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user' });
  }
};

