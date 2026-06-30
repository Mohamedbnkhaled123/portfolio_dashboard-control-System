import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAbout } from '../pages/about/about.model';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  private apiURl = 'http://localhost:5000/api/about';
  constructor(private http: HttpClient) {}

  //get about data
  getAboutData(): Observable<{ success: boolean; data: IAbout }> {
    return this.http.get<{ success: boolean; data: IAbout }>(this.apiURl);
  }
  // Update about data
  updateAboutData(aboutData: IAbout): Observable<{ success: boolean; data: IAbout }> {
    return this.http.put<{ success: boolean; data: IAbout }>(this.apiURl, aboutData);
  }

  uploadImage(file: File): Observable<{ success: boolean; imageUrl: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ success: boolean; imageUrl: string }>('http://localhost:5000/api/upload', formData);
  }
}
