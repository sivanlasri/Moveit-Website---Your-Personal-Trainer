import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingPlanService {
  private apiUrl = 'http://localhost:3000/api/training-plan';

  constructor(private http: HttpClient) {}

  getTrainingPlan(userName: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userName}`);
  }
}
