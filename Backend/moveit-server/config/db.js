const { Sequelize } = require('sequelize');
require('dotenv').config();

// יצירת מופע של Sequelize עם הנתונים מקובץ .env
const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER,
  process.env.DB_PASSWORD, // תמיכה בסיסמה ריקה
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, // ברירת מחדל ל-MySQL
    dialect: 'mysql',
    logging: false, // אפשר לשנות ל-console.log אם רוצים לראות שאילתות
  }
);

module.exports = sequelize;