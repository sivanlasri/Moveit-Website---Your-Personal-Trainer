import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router for navigation
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Import connection for backend communication

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginPageComponent {
  username: string = '';
  password: string = '';
  loginError: string = ''; // this will store the error message


  constructor(private http: HttpClient,private router: Router,private cdr: ChangeDetectorRef) {} // Inject HttpClient for potential future use

ngOnInit() {
    document.body.style.overflowY = 'hidden';
}
  onSubmit() {
  const body = {
    user_name: this.username,
    password: this.password
  };

  this.http.post('http://localhost:3000/api/users/login', body).subscribe({
    next: (res: any) => {
      console.log('Login successful:', res);

      // 👉 שמירת שם המשתמש בזיכרון הדפדפן
      localStorage.setItem('username', res.user_name); // או res.username לפי מה ששרת מחזיר

      // מעבר לעמוד הבית
      this.router.navigate(['/']);
    },
    error: () => {
      this.loginError = 'Incorrect username or password.';
      this.cdr.detectChanges(); // Force the HTML to change
    }
  });
}
  goToRegister() {
    this.router.navigate(['/healthdec']);
  }

  // Clears error when input is changing
  clearError() {
    this.loginError = '';
  }


}