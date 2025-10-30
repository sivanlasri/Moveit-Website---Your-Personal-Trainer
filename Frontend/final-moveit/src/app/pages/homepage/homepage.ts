import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, Header, Footer, HttpClientModule, RouterModule],
  templateUrl: './homepage.html',
  styleUrls: ['./homepage.css'],
})
export class HomeComponent implements OnInit {
  username: string | null = null;
  hasPrefs = false;
  buttonText = 'Join us TODAY!';
  buttonLink: string = '/register'; 


  constructor(
    private router: Router,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    console.log('🟢 Username:', this.username);

    if (this.username) 
    {
      this.http.get<any>(`http://localhost:3000/api/user-preferences/${this.username}`).subscribe({
        next: (data) => {
          if (data && Object.keys(data).length > 0) {
            this.hasPrefs = true;
            this.buttonText = 'To your plan';
            this.buttonLink = '/';   
          } else {
            this.hasPrefs = false;
            this.buttonText = 'fill the questionnaire';
            this.buttonLink = '/user-preferences';    // נתיב לשאלון
          }
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.hasPrefs = false;
          this.buttonText = 'fill the questionnaire';
          this.buttonLink = '/user-preferences';
          this.cdr.detectChanges();
        }
      });
    } else {
      this.hasPrefs = false;
      this.buttonText = 'Join us TODAY!';
      this.buttonLink = '/register';  
    }

  }

  logout(): void {
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  registrate(): void {
    this.router.navigate(['/healthdec']);
  }
}
