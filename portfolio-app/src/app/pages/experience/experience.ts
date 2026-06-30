import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceService } from '../../services/experience.service';
import { IExperiencesDoc } from './experience.model';

@Component({
  selector: 'app-experience',
  imports: [CommonModule],
  templateUrl: './experience.html',
  styleUrl: './experience.css',
})
export class Experience implements OnInit {
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
      error: (err) => console.error('Error loading experience data:', err)
    });
  }
}
