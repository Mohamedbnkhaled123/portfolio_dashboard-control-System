import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IExperiencesDoc } from '../pages/experience/experience.model';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  private apiURl = 'http://localhost:5000/api/experiences';
  constructor(private http: HttpClient) {}

  // Get single experience document containing list
  getExperienceData(): Observable<{ success: boolean; data: IExperiencesDoc }> {
    return this.http.get<{ success: boolean; data: IExperiencesDoc }>(this.apiURl);
  }

  // Update single experience document containing list
  updateExperienceData(experienceData: IExperiencesDoc): Observable<{ success: boolean; data: IExperiencesDoc }> {
    return this.http.put<{ success: boolean; data: IExperiencesDoc }>(this.apiURl, experienceData);
  }
}
