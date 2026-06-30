import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  IProjectsDoc } from '../pages/projects/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private apiURl = 'http://localhost:5000/api/projects';
  constructor(private http: HttpClient) {}

  //get projects data

  // جلب المستند الموحد
  getProjectData(): Observable<{ success: boolean; data: IProjectsDoc }> {
    return this.http.get<{ success: boolean; data: IProjectsDoc }>(this.apiURl);
  }
  // تحديث المستند بالكامل
  updateProjectData(projectData: IProjectsDoc): Observable<{ success: boolean; data: IProjectsDoc }> {
    return this.http.put<{ success: boolean; data: IProjectsDoc }>(this.apiURl, projectData);
  }
  // add new project
  addProject(projectData: IProjectsDoc): Observable<{ success: boolean; data: IProjectsDoc }> {
    return this.http.post<{ success: boolean; data: IProjectsDoc }>(this.apiURl, projectData);
  }
  //delete project
  deleteProject(id: string): Observable<{ success: boolean; data: IProjectsDoc }> {
    return this.http.delete<{ success: boolean; data: IProjectsDoc }>(`${this.apiURl}/${id}`);
  }

  uploadImage(file: File): Observable<{ success: boolean; imageUrl: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ success: boolean; imageUrl: string }>('http://localhost:5000/api/upload', formData);
  }
}