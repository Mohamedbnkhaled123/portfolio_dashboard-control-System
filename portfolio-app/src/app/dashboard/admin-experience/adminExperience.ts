import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExperienceService } from '../../services/experience.service';
import { IExperiencesDoc } from '../../pages/experience/experience.model';

@Component({
  selector: 'app-admin-experience',
  imports: [CommonModule, FormsModule],
  templateUrl: './adminExperience.html',
  styleUrl: './adminExperience.css',
})
export class AdminExperience implements OnInit {
  experienceDoc!: IExperiencesDoc;

  constructor(private experienceService: ExperienceService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.experienceService.getExperienceData().subscribe({
      next: (response) => {
        if (response.success) {
          this.experienceDoc = response.data;
          this.cdr.detectChanges();
        }
      },
      error: (err) => console.error('Error loading admin experience data:', err)
    });
  }

  addNewExperience(): void {
    if (!this.experienceDoc.experienceList) {
      this.experienceDoc.experienceList = [];
    }
    this.experienceDoc.experienceList.push({
      jobHistory: '',
      jobTitle: '',
      jobDesc: ''
    });
    this.cdr.detectChanges();
  }

  deleteExperience(index: number): void {
    this.experienceDoc.experienceList.splice(index, 1);
    this.cdr.detectChanges();
  }

  onSubmit(): void {
    this.experienceService.updateExperienceData(this.experienceDoc).subscribe({
      next: (response) => {
        if (response.success) {
          alert('Experience data updated successfully!');
          this.experienceDoc = response.data;
          this.cdr.detectChanges();
        }
      },
      error: (err) => console.error('Error updating experience data:', err)
    });
  }
}
