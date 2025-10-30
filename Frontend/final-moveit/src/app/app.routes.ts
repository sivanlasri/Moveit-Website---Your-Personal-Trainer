// Import Angular's routing module type
import { Routes } from '@angular/router';

// Import the components used in the route configuration
import { LoginPageComponent } from './pages/login/login';
import { HomeComponent } from './pages/homepage/homepage';
import { RegisterComponent } from './pages/registrate/registrate';
import { HealthdecComponent } from './pages/healthdec/healthdec';
import { RegisterEndComponent } from './pages/register-end/register-end';   
import { UserPreferences } from './pages/user-preferences/user-preferences'


// Define the application's routes
export const routes: Routes = [
  { path: 'login', component: LoginPageComponent }, // Route for the login page
  { path: '', component: HomeComponent }, // Default route (homepage)
  { path: 'register', component: RegisterComponent }, // Route for the registration form
  { path: 'healthdec', component: HealthdecComponent }, // Route for the health declaration step before registration
  { path: 'register-end', component: RegisterEndComponent}, // Route for the final confirmation page after registration
  { path: 'user-preferences', component: UserPreferences}, // Route for User Preferences Component to fill quiz
 
]; 

