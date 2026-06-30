import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { IProjectsDoc } from '../../pages/projects/project.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard-projects',
  imports: [FormsModule],
  templateUrl: './adminProjects.html',
  styleUrl: './adminProjects.css',
})
export class AdminProjects implements OnInit {
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
      error: (err) => console.error('Error loading admin projects data:', err)
    });
  }

  // إضافة كارت مشروع للمصفوفة محلياً
  addNewProject(): void {
    if (!this.projectsDoc.projectsList) {
      this.projectsDoc.projectsList = [];
    }
    this.projectsDoc.projectsList.push({ title: '', badge: '', description: '', tags: '' });
    this.cdr.detectChanges();
  }

  // حذف مشروع من المصفوفة محلياً
  deleteProject(index: number): void {
    this.projectsDoc.projectsList.splice(index, 1);
    this.cdr.detectChanges();
  }

  // حفظ المستند بالكامل
  onSubmit(): void {
    this.projectService.updateProjectData(this.projectsDoc).subscribe({
      next: (response) => {
        if (response.success) {
          alert('All projects updated successfully!');
          this.projectsDoc = response.data;
          this.cdr.detectChanges();
        }
      },
      error: (err) => console.error('Error updating projects:', err)
    });
  }

  onImageUpload(event: Event, index: number): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      this.projectService.uploadImage(file).subscribe({
        next: (res) => {
          if (res.success) {
            this.projectsDoc.projectsList[index].imageUrl = res.imageUrl;
            this.cdr.detectChanges();
          }
        },
        error: (err) => console.error('Upload failed:', err)
      });
    }
  }
}
