import { Component } from '@angular/core'; // Importing core Angular functionality
import { Router } from '@angular/router'; // Importing the router to navigate between routes

@Component({
  selector: 'app-register-end', // Component selector used in HTML
  templateUrl: './register-end.html', // Path to the HTML template
  styleUrls: ['./register-end.css'], // Path to the CSS styling
  standalone: true  // Declares this as a standalone component
})
export class RegisterEndComponent {
  // Injecting the Router service to allow navigation
  constructor(private router: Router) {}

  // Navigates the user to the login screen
  goToLogin() {
    this.router.navigate(['/login']); // Navigate to the '/login' route
  }
}
