
# Moveit - Your Personal Trainer

**Moveit** is a modern fitness web application designed to guide users on their personal fitness journey. Our platform empowers users to make meaningful changes by providing tools, guidance, and eventually personalized training recommendations.

This project was developed as part of the **Web Application Development course** at **Kinneret Academic College**.  

**Authors:** Shalev Turgeman, Sivan Lasri, David Ran Cohen.


We identified a gap in free platforms that help users tailor fitness routines to their own needs. Moveit fills that gap by offering a structured, interactive, and visually engaging experience.

---

## 🎯 Core Features
- **Personal Preferences Questionnaire:** Users define their fitness level, goals, available days, and preferred workout duration. This forms the foundation for future personalized workout plans.  
- **Multi-Step Registration:** Smooth onboarding process including personal details and health declaration, designed for clarity and user-friendliness.  
- **Login & Home Screens:** Secure authentication with intuitive navigation. Users can easily switch between login, registration, and home screens.  
- **Interactive User Interface:** Engaging selection buttons, progress indicators, dynamic visuals, and images for maximum user experience.  
- **Custom SQL Database:** Users and their preferences are stored safely, preparing the platform for future personalized recommendations.

---

## 🛠 Technologies
- **Frontend:** Angular, HTML, CSS, JavaScript  
- **Backend / Database:** Custom SQL tables for users and user preferences  
- **Deployment:** GitHub Pages (for static frontend)  

---

## 🎨 Design & UX
- **Color Palette:** Bold and energetic **Red**, **Black**, **Gray**, and **White**  
- Clean, modern, and responsive layout  
- Visual cues and progression indicators for engaging user experience  
- Focus on simplicity while keeping the interface visually striking

---

## 🚀 Future Plans
- **Personalized Training Plan:** Algorithmically generate customized workout plans based on user questionnaire answers  
- Enhanced interactive screens and dynamic content to improve user engagement  
- Improved analytics and tracking features for long-term fitness planning

---

## 📂 How to Run Locally

To run the project locally, follow these steps:

### 1️⃣ Set up the Database
1. Open MySQL (or any MySQL client).  
2. Create a new database (example: `moveit_db`):
   ```sql
   CREATE DATABASE moveit_db;
    ````

3. Import the provided SQL tables:

   ```bash
   mysql -u your_username -p moveit_db < path/to/users.sql
   mysql -u your_username -p moveit_db < path/to/user_preferences.sql
    ......
   ```
4. Verify the tables exist:

   ```sql
   USE moveit_db;
   SHOW TABLES;
   ```
   
---

### 2️⃣ Start the Backend Server

1. Navigate to the backend directory:

   ```bash
   cd path/to/backend
   ```
2. Install dependencies (if using Node.js/Express):

   ```bash
   npm install
   ```
3. Start the server:

   ```bash
   npm start
   ```

   * Ensure the server connects to your MySQL database and serves the `index` route for the frontend.

---

### 3️⃣ Run the Frontend

1. Navigate to the frontend directory (Angular project):

   ```bash
   cd path/to/frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Run the Angular development server:

   ```bash
   ng serve
   ```
4. Open your browser at [http://localhost:4200](http://localhost:4200) to view the website.

💡 **Tip:** Make sure the backend server is running before interacting with the frontend, so all API calls and database interactions work correctly.

---

## 📂 Repository Structure

* `Frontend/` – Angular frontend files
* `Backend/` – Server files and API endpoints
* `SQL/` – Database tables (`users.sql`, `user_preferences.sql`,...)

---

This README provides all the information needed to understand, run, and further develop the Moveit application.

---

