// services/userService.js
const User = require('../models/user'); // Import the User model

// קבלת כל המשתמשים
const getAllUsers = async () => {
  return await User.findAll();
};

// קבלת משתמש לפי שם משתמש
const getUserByUsername = async (username) => {
  return await User.findByPk(username);
};

// הרשמה – יצירת משתמש חדש
const createUser = async (userData) => {
  return await User.create(userData);
};

// התחברות – בדיקת שם משתמש וסיסמה
const loginUser = async (username, password) => {
  const user = await User.findByPk(username);
  if (user && user.password === password) {
    return user;
  }
  return null;
};

// עדכון פרטי משתמש
const updateUser = async (username, updatedData) => {
  const user = await User.findByPk(username);
  if (!user) return null;
  return await user.update(updatedData);
};

// מחיקת משתמש
const deleteUser = async (username) => {
  const user = await User.findByPk(username);
  if (!user) return null;
  await user.destroy();
  return true;
};

// בדיקת קיום אימייל
const getUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

module.exports = {
  getAllUsers,
  getUserByUsername,
  getUserByEmail,
  createUser,
  loginUser,
  updateUser,
  deleteUser
};