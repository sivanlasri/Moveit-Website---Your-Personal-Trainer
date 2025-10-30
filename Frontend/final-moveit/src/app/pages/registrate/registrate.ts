// Import core Angular and utility modules
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms'; // For template-driven forms
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // For making HTTP requests

@Component({
  selector: 'app-register', // Component selector used in templates
  standalone: true, // This is a standalone component (not declared in an NgModule)
  templateUrl: './registrate.html', // HTML template path
  styleUrls: ['./registrate.css'], // CSS file path
  imports: [FormsModule, CommonModule, HttpClientModule] // Required modules for this component
})
export class RegisterComponent { 
  // Form data fields bound to inputs via [(ngModel)]
  fullName: string = '';
  username: string = '';
  email: string = '';
  phone: string = '';
  password: string = '';
  confirmPassword: string = '';

  // Controls validation logic
  passwordsMatch: boolean = true; //check if the password match to each other
  gender: string = '';
  birthdate: string = '';

  usernameTaken: boolean = false;
  emailTaken: boolean = false;

  //Injects Angular's Router for navigation and HttpClient for API requests
  constructor(private router: Router, private http: HttpClient) {}

  // Lifecycle hook to set body styles
  ngOnInit() {
    document.body.style.overflowX = 'hidden';
    document.body.style.overflowY = 'hidden';
  }

  // checking if username is unique
  checkUsername(): void {
    if (!this.username) return;

    this.http.get(`http://localhost:3000/api/users/username/${this.username}`).subscribe({
      next: (user: any) => this.usernameTaken = !!user, // Set flag if user exists
      error: () => this.usernameTaken = false // Assume not taken if server error
    });
  }


  checkPasswordsMatch() { //check if the password match to each other
  this.passwordsMatch = this.password === this.confirmPassword;
}

// Check if the user is at least 14 years old
isAtLeast14YearsOld(birthdate: string): boolean {
  if (!birthdate) return true; // Don’t show error if date not chosen yet

  const birth = new Date(birthdate);
  const today = new Date();

  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  const d = today.getDate() - birth.getDate();

  if (age > 14) return true;
  if (age === 14 && (m > 0 || (m === 0 && d >= 0))) return true;

  return false;
}



// checking if email is unique
  checkEmail(): void {

    if (!this.email) return;

    this.http.get(`http://localhost:3000/api/users/email/${this.email}`).subscribe({
      next: (user: any) => this.emailTaken = !!user, // If user exists with this email
      error: () => this.emailTaken = false // On error, assume not taken
    });
  }

  // Form submission handler
  onSubmit(form: NgForm): void {
    // Only continue if form is valid and passes all extra checks
  if (form.valid && !this.usernameTaken && !this.emailTaken && this.passwordsMatch && this.isAtLeast14YearsOld(this.birthdate)) {
    // Build user data object
    const userData = {
      full_name: this.fullName,
      user_name: this.username,
      email: this.email,
      phone: this.phone,
      password: this.password,
      gender: this.gender,
      birthday: this.birthdate
    };

    // Send user data to backend server
    this.http.post('http://localhost:3000/api/users', userData).subscribe({
      next: (response) => {
        console.log('User registered successfully:', response);
        this.router.navigate(['/register-end']); // Navigate to success screen
      },
      error: (error) => {
        console.error('Error registering user:', error);
        alert('Registration failed: ' + (error.error?.error || 'Server error'));
      }
    });
  } else {
    // Log an error if the form is invalid or one of the checks failed
    console.log('Form is invalid or username/email taken');
  }
}

}
