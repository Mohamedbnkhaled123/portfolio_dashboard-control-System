import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { IHome } from '../pages/home/home.model';
@Injectable({
  providedIn: 'root',
})
export class HomeService {

  private apiUrl = 'http://localhost:5000/api/home';

  constructor(private http: HttpClient) { }
  
  getHomeData(): Observable<{ success: boolean; data: IHome }> {
    return this.http.get<{ success: boolean; data: IHome }>(this.apiUrl);
  }

  updateHomeData( homeData: IHome):
   Observable<{ success: boolean; data: IHome }> {
    return this.http.put<{ success: boolean; data: IHome }>(this.apiUrl, homeData);
  }

  uploadImage(file: File): Observable<{ success: boolean; imageUrl: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ success: boolean; imageUrl: string }>('http://localhost:5000/api/upload', formData);
  }

}
