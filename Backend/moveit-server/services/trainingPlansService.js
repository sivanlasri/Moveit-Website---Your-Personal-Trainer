// services/trainingPlansService.js - גרסה משופרת
const { Op } = require('sequelize');
const TrainingPlans = require('../models/training_plans');
const TrainingDay = require('../models/training_days');
const TrainingDayExercise = require('../models/training_day_exercises');
const Exercise = require('../models/exercises');
const UserAssignedPlans = require('../models/user_assigned_plans');

// פונקציות בסיסיות לניהול תוכניות אימונים
const getAllTrainingPlans = async () => {
  return await TrainingPlans.findAll();
};

const getTrainingPlanById = async (planId) => {
  return await TrainingPlans.findByPk(planId);
};

const createTrainingPlan = async (planData) => {
  return await TrainingPlans.create(planData);
};

const updateTrainingPlan = async (planId, updatedData) => {
  const plan = await getTrainingPlanById(planId);
  if (!plan) return null;
  return await plan.update(updatedData);
};

const deleteTrainingPlan = async (planId) => {
  const plan = await getTrainingPlanById(planId);
  if (!plan) return null;
  await plan.destroy();
  return true;
};

// פונקציות חיפוש מתקדמות
const getTrainingPlansByFilters = async (filters) => {
  const whereClause = {};
  
  if (filters.category) whereClause.category = filters.category;
  if (filters.goal) whereClause.training_plans_goal = filters.goal;
  if (filters.level) whereClause.training_plans_level = filters.level;
  if (filters.avgTime) whereClause.training_plans_avg_time = filters.avgTime;
  
  return await TrainingPlans.findAll({ where: whereClause });
};

// פונקציה לבניית יום אימונים בודד
async function buildTrainingDay(userPrefs, dayCategories, dayNumber, planId) {
  const { fitness_level, training_time } = userPrefs;

  // חיפוש תרגילים מתאימים
  const exercises = await Exercise.findAll({
    where: {
      ex_level: fitness_level,
      ex_category: { [Op.in]: dayCategories }
    },
    order: [['ex_duration', 'ASC']] // מיון לפי משך זמן
  });

  if (exercises.length === 0) {
    throw new Error(`No exercises found for level: ${fitness_level}, categories: ${dayCategories.join(', ')}`);
  }

  // אלגוריתם חכם יותר לבחירת תרגילים
  let selectedExercises = [];
  let totalDuration = 0;
  const targetTime = training_time;
  const tolerance = 5; // סובלנות של 5 דקות
  
  // קבוצות תרגילים לפי קטגוריה
  const exercisesByCategory = {};
  dayCategories.forEach(cat => {
    exercisesByCategory[cat] = exercises.filter(ex => ex.ex_category === cat);
  });

  // בחירה מאוזנת מכל קטגוריה
  const exercisesPerCategory = Math.floor(targetTime / (dayCategories.length * 15)); // ממוצע של 15 דקות לתרגיל
  
  for (const category of dayCategories) {
    const categoryExercises = exercisesByCategory[category];
    if (categoryExercises.length === 0) continue;
    
    let categoryCount = 0;
    let categoryPool = [...categoryExercises];
    
    while (categoryCount < exercisesPerCategory && categoryPool.length > 0 && totalDuration < targetTime - tolerance) {
      const randomIndex = Math.floor(Math.random() * categoryPool.length);
      const exercise = categoryPool.splice(randomIndex, 1)[0];
      
      if (totalDuration + exercise.ex_duration <= targetTime + tolerance) {
        selectedExercises.push(exercise);
        totalDuration += exercise.ex_duration;
        categoryCount++;
      }
    }
  }

  // אם נשאר זמן, נוסיף תרגילים נוספים
  const remainingExercises = exercises.filter(ex => 
    !selectedExercises.some(selected => selected.ex_id === ex.ex_id)
  );
  
  while (totalDuration < targetTime - tolerance && remainingExercises.length > 0) {
    const randomIndex = Math.floor(Math.random() * remainingExercises.length);
    const exercise = remainingExercises.splice(randomIndex, 1)[0];
    
    if (totalDuration + exercise.ex_duration <= targetTime + tolerance) {
      selectedExercises.push(exercise);
      totalDuration += exercise.ex_duration;
    }
  }

  // יצירת יום האימונים במסד הנתונים
  const day = await TrainingDay.create({
    training_plans_id: planId,
    training_days_day_number: dayNumber,
    training_days_name: dayCategories.join(' & ')
  });

  // הוספת התרגילים ליום
  for (let i = 0; i < selectedExercises.length; i++) {
    const exercise = selectedExercises[i];
    await TrainingDayExercise.create({
      training_day_id: day.training_days_id,
      exercise_id: exercise.ex_id,
      training_day_exercises_sets: getDefaultSets(exercise.ex_category, userPrefs.goal),
      training_day_exercises_reps: getDefaultReps(exercise.ex_category, userPrefs.goal),
      order_in_day: i + 1
    });
  }

  return { day, selectedExercises, totalDuration };
}

// פונקציות עזר לקביעת סטים וחזרות
function getDefaultSets(category, goal) {
  const setsMap = {
    'Mass': { 'Chest': 4, 'Back': 4, 'Legs': 4, 'Shoulders': 3, 'Biceps': 3, 'Triceps': 3, 'Abs': 3, 'Core': 3 },
    'Cut': { 'Chest': 3, 'Back': 3, 'Legs': 4, 'Shoulders': 3, 'Biceps': 3, 'Triceps': 3, 'Abs': 4, 'Core': 4 },
    'Cardio': { 'Core': 3 },
    'Preservation': { 'Chest': 3, 'Back': 3, 'Legs': 3, 'Shoulders': 3, 'Biceps': 3, 'Triceps': 3, 'Abs': 3, 'Core': 3 }
  };
  
  return setsMap[goal]?.[category] || 3;
}

function getDefaultReps(category, goal) {
  const repsMap = {
    'Mass': { 'Chest': 8, 'Back': 8, 'Legs': 10, 'Shoulders': 10, 'Biceps': 10, 'Triceps': 10, 'Abs': 15, 'Core': 15 },
    'Cut': { 'Chest': 12, 'Back': 12, 'Legs': 15, 'Shoulders': 12, 'Biceps': 12, 'Triceps': 12, 'Abs': 20, 'Core': 20 },
    'Cardio': { 'Core': 30 },
    'Preservation': { 'Chest': 10, 'Back': 10, 'Legs': 12, 'Shoulders': 10, 'Biceps': 10, 'Triceps': 10, 'Abs': 15, 'Core': 15 }
  };
  
  return repsMap[goal]?.[category] || 10;
}

// פונקציה לבניית תוכנית מלאה
async function buildFullPlan(userPrefs) {
  const { goal, available_days, fitness_level, training_time, user_name } = userPrefs;

  // בדיקת תקינות הפרמטרים
  if (!goal || !available_days || !fitness_level || !training_time || !user_name) {
    throw new Error('Missing required user preferences');
  }

  // בדיקה אם המשתמש כבר יש לו תוכנית
  const existingAssignment = await UserAssignedPlans.findOne({
    where: { user_assigned: user_name }
  });

  if (existingAssignment) {
    // מחיקת התוכנית הישנה
    const oldPlan = await TrainingPlans.findByPk(existingAssignment.training_plan_id);
    if (oldPlan) {
      await TrainingDay.destroy({ where: { training_plans_id: oldPlan.training_plans_id } });
      await oldPlan.destroy();
    }
    await existingAssignment.destroy();
  }

  // יצירת תוכנית חדשה
  const plan = await TrainingPlans.create({
    training_plans_goal: goal,
    training_plans_name: `${goal} - ${fitness_level} Plan for ${user_name}`,
    training_plans_level: fitness_level,
    training_plans_avg_time: training_time
  });

  // הגדרת חלוקת ימי האימונים בהתאם למטרה
  let split = getSplitByGoalAndDays(goal, available_days);

  // בניית הימים
  let days = [];
  let dayNumber = 1;
  
  for (const categories of split) {
    try {
      const dayResult = await buildTrainingDay(userPrefs, categories, dayNumber++, plan.training_plans_id);
      days.push(dayResult);
    } catch (error) {
      console.error(`Error building day ${dayNumber - 1}:`, error);
      // ניסיון עם קטגוריות פחות ספציפיות
      const fallbackCategories = ['Core']; // קטגוריה שתמיד תמצא תרגילים
      const dayResult = await buildTrainingDay(
        { ...userPrefs, fitness_level: 'Beginner' }, 
        fallbackCategories, 
        dayNumber - 1, 
        plan.training_plans_id
      );
      days.push(dayResult);
    }
  }

  // הקצאת התוכנית למשתמש
  await UserAssignedPlans.create({
    training_plan_id: plan.training_plans_id,
    user_assigned: user_name
  });

  return { plan, days };
}

// פונקציה לקבלת חלוקת ימים
function getSplitByGoalAndDays(goal, available_days) {
  const splits = {
    'Mass': {
      1: [['Back','Chest','Legs','Shoulders','Biceps','Triceps','Abs']],
      2: [['Back','Chest','Shoulders','Biceps','Triceps'], ['Legs','Abs']],
      3: [['Back','Biceps'], ['Chest','Shoulders','Triceps'], ['Legs','Abs']],
      4: [['Back','Biceps'], ['Chest','Shoulders','Triceps'], ['Legs','Abs'], ['Back','Chest']],
      5: [['Back','Biceps'], ['Chest','Shoulders','Triceps'], ['Legs','Abs'], ['Back','Biceps'], ['Chest','Triceps']],
      6: [['Back','Biceps'], ['Chest','Shoulders','Triceps'], ['Legs','Abs'], ['Back','Biceps'], ['Chest','Shoulders','Triceps'], ['Legs']],
      7: [['Back','Biceps'], ['Chest','Shoulders','Triceps'], ['Legs','Abs'], ['Back','Biceps'], ['Chest','Shoulders','Triceps'], ['Legs'], ['Abs']]
    },
    'Cut': {
      1: [['Back','Chest','Legs','Shoulders','Biceps','Triceps','Core']],
      2: [['Back','Chest','Shoulders','Biceps','Triceps','Core'], ['Legs','Core']],
      3: [['Back','Chest','Shoulders','Biceps','Core'], ['Legs','Core'], ['Core']],
      4: [['Back','Biceps','Core'], ['Chest','Shoulders','Triceps','Core'], ['Legs','Abs','Core'], ['Core']],
      5: [['Back','Chest','Shoulders','Biceps','Triceps','Core'], ['Legs','Abs','Core'], ['Back','Chest','Core'], ['Legs','Core'], ['Core']],
      6: [['Back','Biceps','Core'], ['Chest','Shoulders','Triceps','Core'], ['Legs','Abs','Core'], ['Core'], ['Back','Chest','Core'], ['Legs','Core']],
      7: [['Back','Biceps','Core'], ['Chest','Shoulders','Triceps','Core'], ['Legs','Abs','Core'], ['Core'], ['Back','Chest','Core'], ['Legs','Core'], ['Core']]
    },
    'Cardio': {
      1: [['Core']],
      2: [['Core'], ['Core']],
      3: [['Core'], ['Core'], ['Core']],
      4: [['Core'], ['Core'], ['Core'], ['Core']],
      5: [['Core'], ['Core'], ['Core'], ['Core'], ['Core']],
      6: [['Core'], ['Core'], ['Core'], ['Core'], ['Core'], ['Core']],
      7: [['Core'], ['Core'], ['Core'], ['Core'], ['Core'], ['Core'], ['Core']]
    },
    'Preservation': {
      1: [['Back','Chest','Legs','Shoulders','Biceps','Triceps','Core']],
      2: [['Back','Chest','Shoulders','Biceps','Triceps','Core'], ['Legs','Core']],
      3: [['Back','Chest','Shoulders','Biceps','Triceps'], ['Legs','Abs'], ['Core']],
      4: [['Back','Biceps'], ['Chest','Shoulders','Triceps'], ['Legs','Abs'], ['Core']],
      5: [['Back','Chest','Shoulders','Biceps','Triceps'], ['Legs','Abs'], ['Back','Chest'], ['Legs'], ['Core']],
      6: [['Back','Biceps'], ['Chest','Shoulders','Triceps'], ['Legs','Abs'], ['Core'], ['Back','Chest'], ['Legs']],
      7: [['Back','Biceps'], ['Chest','Shoulders','Triceps'], ['Legs','Abs'], ['Back','Biceps'], ['Chest','Shoulders','Triceps'], ['Legs'], ['Core']]
    }
  };

  return splits[goal]?.[available_days] || splits['Preservation'][3]; // ברירת מחדל
}

module.exports = {
  getAllTrainingPlans,
  getTrainingPlanById,
  createTrainingPlan,
  updateTrainingPlan,
  deleteTrainingPlan,
  getTrainingPlansByFilters,
  buildTrainingDay,
  buildFullPlan
};