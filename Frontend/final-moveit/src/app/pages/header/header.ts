// Import common Angular features and modules
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { RouterModule } from '@angular/router';

// Define the component metadata
@Component({
  selector: 'app-header', // The component's HTML tag
  standalone: true, // Allows this component to be used without a module
  imports: [CommonModule,RouterModule], // Importing CommonModule for structural directives like *ngIf
  templateUrl: './header.html', // Path to the HTML template
  styleUrls: ['./header.css'], // Paths to associated style sheets
})
export class Header implements OnInit {
  // A variable to store the current username, if available
  username: string | null = null;

  // A variable to store the current username, if available
  constructor(private router: Router) {}

  // Called once the component is initialized
  ngOnInit(): void {
    // Retrieve the username from local storage (if exists)
    this.username = localStorage.getItem('username');
  }

// Log out function: clears user data and redirects to login page
  logout(): void {
    localStorage.removeItem('username'); // Remove username from local storage
    this.router.navigate(['/login']); // Navigate to login screen
  }

   // Navigate to login screen
  login(): void{
    this.router.navigate(['/login']);
  }

  // Navigate to registration or health declaration page
  registrate(): void{
    this.router.navigate(['/healthdec']);
  }

}