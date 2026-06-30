import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsService } from '../../services/projects.service';
import { IProjectsDoc } from './project.model';

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects implements OnInit {
  projectsDoc!: IProjectsDoc;

  constructor(private projectService: ProjectsService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.projectService.getProjectData().subscribe({
      next: (response) => {
        if (response.success) {
          this.projectsDoc = response.data;
          this.cdr.detectChanges();
        }
      },
      error: (err) => console.error('Error loading projects:', err)
    });
  }

  
  getTagsArray(tags: string): string[] {
    if (!tags) return [];
    return tags.split(',').map(t => t.trim()).filter(Boolean);
  }
}
