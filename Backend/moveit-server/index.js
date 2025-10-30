const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./config/db'); // חיבור למסד הנתונים עם Sequelize
const userRoutes = require('./routes/userRoutes');
const userPreferencesRoutes = require('./routes/userPreferencesRoutes');
const userAssignedPlansRoutes = require('./routes/userAssignedPlansRoutes');
const trainingPlansRoutes = require('./routes/trainingPlansRoutes');
const trainingDaysRoutes = require('./routes/trainingDaysRoutes');
const trainingDayExercisesRoutes = require('./routes/trainingDayExercisesRoutes');
const exercisesRoutes = require('./routes/exercisesRoutes');


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/user-preferences', userPreferencesRoutes);
app.use('/api/user-assigned-plans', userAssignedPlansRoutes);
app.use('/api/training-plans', trainingPlansRoutes);
app.use('/api/training-days', trainingDaysRoutes);
app.use('/api/training-day-exercises', trainingDayExercisesRoutes);
app.use('/api/exercises', exercisesRoutes);




// בדיקה שה-root עובד
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// התחברות למסד הנתונים ורק לאחר מכן - הפעלת השרת
sequelize.authenticate()
  .then(() => {
    console.log('✅ Connected to MySQL database via Sequelize');
    
    // אפשר גם לסנכרן טבלאות כאן אם רוצים:
    // return sequelize.sync(); // זה ייצור טבלאות לפי המודלים אם הן לא קיימות
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('❌ Failed to connect to the database:', err);
  });

  
