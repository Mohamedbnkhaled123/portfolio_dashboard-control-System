import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISkill } from '../pages/skills/skill.model';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  private apiURl = 'http://localhost:5000/api/skills';
  constructor(private http: HttpClient) {}

  //get skills data
  getSkillData(): Observable<{ success: boolean; data: ISkill }> {
    return this.http.get<{ success: boolean; data: ISkill }>(this.apiURl);
  }
  // Update skills data
  updateSkillData(skillData: ISkill): Observable<{ success: boolean; data: ISkill }> {
    return this.http.put<{ success: boolean; data: ISkill }>(this.apiURl, skillData);
  }
}
