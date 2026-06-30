import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SkillService } from '../../services/skill.service';
import { ISkill } from '../../pages/skills/skill.model';

@Component({
  selector: 'app-admin-skills',
  imports: [CommonModule, FormsModule],
  templateUrl: './adminSkills.html',
  styleUrl: './adminSkills.css',
})
export class AdminSkills implements OnInit {
  skillsData!: ISkill;
  
  // مصفوفات مؤقتة بأسماء العناصر فقط
  skillsList: { name: string }[] = [];
  badgesList: { name: string }[] = [];

  constructor(private skillService: SkillService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.skillService.getSkillData().subscribe({
      next: (response) => {
        if (response.success) {
          this.skillsData = response.data;
          
          this.parseSkills();
          this.parseBadges();
          
          this.cdr.detectChanges();
        }
      },
      error: (err) => console.error('Error loading admin skills data:', err)
    });
  }

  // تحويل نص المهارات القادم من السيرفر إلى مصفوفة للواجهة
  parseSkills(): void {
    if (this.skillsData && this.skillsData.mySkills) {
      this.skillsList = this.skillsData.mySkills.split(',').map(item => {
        return { name: item.trim() };
      }).filter(s => s.name);
    }
  }

  // تحويل نص الأدوات القادم من السيرفر إلى مصفوفة للواجهة
  parseBadges(): void {
    if (this.skillsData && this.skillsData.toolDetails) {
      this.badgesList = this.skillsData.toolDetails.split(',').map(item => {
        return { name: item.trim() };
      }).filter(b => b.name);
    }
  }

  addSkill(): void {
    this.skillsList.push({ name: '' });
  }

  removeSkill(index: number): void {
    this.skillsList.splice(index, 1);
  }

  addBadge(): void {
    this.badgesList.push({ name: '' });
  }

  removeBadge(index: number): void {
    this.badgesList.splice(index, 1);
  }

  onSubmit(): void {
    // دمج المصفوفات إلى نصوص مفصولة بفاصلة فقط عند الإرسال
    this.skillsData.mySkills = this.skillsList
      .map(s => s.name)
      .filter(Boolean)
      .join(',');

    this.skillsData.toolDetails = this.badgesList
      .map(b => b.name)
      .filter(Boolean)
      .join(',');

    this.skillService.updateSkillData(this.skillsData).subscribe({
      next: (response) => {
        if (response.success) {
          alert('Skills & Tools updated successfully!');
          this.skillsData = response.data;
          this.parseSkills();
          this.parseBadges();
          this.cdr.detectChanges();
        }
      },
      error: (err) => console.error('Error updating skills data:', err)
    });
  }
}
