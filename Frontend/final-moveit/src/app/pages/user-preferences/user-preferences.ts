import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { HttpClientModule, HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-user-preferences',
  imports: [Header, Footer, CommonModule,HttpClientModule],
  standalone: true,
  templateUrl: './user-preferences.html',
  styleUrl: './user-preferences.css'
})
export class UserPreferences {

  currentStep = 1;
  selectedAnswer: string | null = null;
  isCompleted = false; //if we finished 4/4

  // Store answers for all steps if needed later
  answers: { [step: number]: string } = {};

  // Current question & options
  options: string[] = ['Beginner','Advanced','Expert'];
  question: string = 'Your fitness level:';
  summaryKeys = [
    { key: 1, label: 'Fitness Level' },
    { key: 2, label: 'Goal' },
    { key: 3, label: 'Available Days' },
    { key: 4, label: 'Training Time' }
  ];

  constructor(private http: HttpClient, private router: Router) {}

  selectAnswer(option: string) {
    this.selectedAnswer = option;
  }

  next() {
    if (!this.selectedAnswer) return;

    // Save the answer for the current step
    this.answers[this.currentStep] = this.selectedAnswer;
    console.log(`Step ${this.currentStep} answer: ${this.selectedAnswer}`);

    this.selectedAnswer = null;

    if (this.currentStep < 5) {
      this.currentStep++;
      this.loadOptions();
    } 
  }

  confirm() {
  const userName = localStorage.getItem('username');
  if (!userName) {
    console.error('❌ No userName found in Local Storage!');
    return;
  }

  const body = {
    userName: userName,
    fitnessLevel: this.answers[1] || null,
    goal: this.answers[2] || null,
    availableDays: this.answers[3] || null,
    trainingTime: this.answers[4] || null
  };

  this.http.post('http://localhost:3000/api/user-preferences', body).subscribe({
    next: (response: any) => {
      console.log('✅ Preferences saved:', response.preferences);
      console.log('💪 Training plan received:', response.trainingPlan);

      // תוכל לשמור את התוכנית ב-localStorage אם תרצה:
      localStorage.setItem('trainingPlan', JSON.stringify(response.trainingPlan));

      // לא נעשה ניווט עדיין
    },
    error: (error) => {
      console.error('❌ Error saving preferences:', error);
    }
  });
}



restart() {
  this.currentStep = 1;
  this.answers = {};
  this.selectedAnswer = null;
  this.isCompleted = false;
  this.loadOptions();
}

  loadOptions() {
    if (this.currentStep === 2) {
      this.question = 'What is your goal?';
      this.options = ['Cut','Mass','Preservation','Cardio'];
    } else if (this.currentStep === 3) {
      this.question = 'How many available days do you have?';
      this.options = ['1', '2', '3', '4', '5', '6', '7'];
    } else if (this.currentStep === 4) {
      this.question = 'How much training time do you have?';
      this.options = ['20', '30', '45', '60', '90'];
    }
    else if(this.currentStep === 1){
      this.question = 'Your fitness level:';
      this.options = ['Beginner','Advanced','Expert'];
    }

    else{
      console.log('All steps completed!');
      console.log('Collected answers:', this.answers);
      this.isCompleted = true;
    }
  }

  // Helper: is current step active
  isStepActive(step: number): boolean {
    return this.currentStep === step;
  }

  // Helper: is step already completed
  isStepCompleted(step: number): boolean {
    return step < this.currentStep;
  }

  getIcon(index: number): string {
  if (this.currentStep === 1) {
    return ['../../../assets/images/user-preferences/stretching-exercises.png', '../../../assets/images/user-preferences/gym.png', '../../../assets/images/user-preferences/workout.png'][index];
  } else if (this.currentStep === 2) {
    return ['../../../assets/images/user-preferences/cut.png', '../../../assets/images/user-preferences/mass.png', '../../../assets/images/user-preferences/preserve.png', '../../../assets/images/user-preferences/cardio.png'][index];
  } else if (this.currentStep === 3) {
    return ['../../../assets/images/user-preferences/prog1.svg', '../../../assets/images/user-preferences/prog2.svg', '../../../assets/images/user-preferences/prog3.svg', '../../../assets/images/user-preferences/prog4.svg', '../../../assets/images/user-preferences/prog5.svg', '../../../assets/images/user-preferences/prog6.svg', '../../../assets/images/user-preferences/prog7.svg'][index];
  } else if (this.currentStep === 4) {
    return ['../../../assets/images/user-preferences/twenty.svg', '../../../assets/images/user-preferences/thirty.svg', '../../../assets/images/user-preferences/fourtyfive.svg', '../../../assets/images/user-preferences/sixty.svg', '../../../assets/images/user-preferences/ninty.svg'][index];
  }
  return '';
}


}