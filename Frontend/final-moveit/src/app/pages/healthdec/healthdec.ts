import { Component } from '@angular/core'; // Importing Angular core Component decorator
import { Router } from '@angular/router'; // Importing Angular core Component decorator
import { FormsModule } from '@angular/forms'; // Importing FormsModule to use ngModel and forms functionalities
import { CommonModule } from '@angular/common'; // Importing CommonModule for common Angular directives

@Component({
  selector: 'app-register-health', // The HTML tag to use this component
  standalone: true, // This component is standalone (not part of a module)
  imports: [FormsModule, CommonModule], // Import necessary modules for template
  templateUrl: './healthdec.html', // HTML template for this component
  styleUrls: ['./healthdec.css'] // HTML template for this component
})
export class HealthdecComponent {
  agreement: boolean = false; // Variable bound to the checkbox, initially false (unchecked)

  constructor(private router: Router) {} // Inject Router service for navigation

  // Lifecycle hook called when component initializes
  ngOnInit() {
    // Disable horizontal and vertical scrolling on the body while this component is active
    document.body.style.overflowX = 'hidden';
    document.body.style.overflowY = 'hidden';
  }

  // Function called when the form is submitted
  onSubmit() {
    if (!this.agreement) { // If the checkbox is NOT checked (agreement not confirmed)
      // If the checkbox is NOT checked (agreement not confirmed)
      return;
    }
    // If checkbox is checked, navigate to the registration page
    this.router.navigate(['/register']);
  }
}
