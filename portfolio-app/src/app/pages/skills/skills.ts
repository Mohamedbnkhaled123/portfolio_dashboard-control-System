import { Component , OnInit , ChangeDetectorRef } from '@angular/core';
import { SkillService } from '../../services/skill.service';
import { ISkill } from './skill.model';
@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills implements OnInit{
    skillData!: ISkill ;
    constructor(private skillService: SkillService,
       private cdr: ChangeDetectorRef){}

    ngOnInit(): void {
      this.skillService.getSkillData().subscribe({
        next: (response) => {
          if (response.success) {
            this.skillData = response.data;
            this.cdr.detectChanges();
          }
        },
        error: (err) => console.error('Error loading skills data:', err)
      });
    }

  getSkillsList(): string[] {
    if (!this.skillData || !this.skillData.mySkills) return [];
    return this.skillData.mySkills.split(',').map(item => item.trim()).filter(Boolean);
  }

  getBadgesList(): string[] {
    if (!this.skillData || !this.skillData.toolDetails) return [];
    return this.skillData.toolDetails.split(',').map(item => item.trim()).filter(Boolean);
  }
}
