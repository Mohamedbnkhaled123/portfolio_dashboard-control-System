import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HomeService } from '../../services/home.service';
import { IHome } from '../../pages/home/home.model';

@Component({
  selector: 'app-dashboard-home',
  imports: [ReactiveFormsModule],
  templateUrl: './adminHome.html',
  styleUrl: './adminHome.css',
})
export class AdminHome implements OnInit {
  homeData!: IHome;
  myForm!: FormGroup;

  constructor(private homeService: HomeService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      headline:  new FormControl(''),
      mainTitle: new FormControl('', [Validators.required]),
      subTitle:  new FormControl(''),
      heroDesc:  new FormControl(''),
    });

    this.homeService.getHomeData().subscribe({
      next: (response) => {
        if (response.success) {
          this.homeData = response.data;
          this.myForm.patchValue(this.homeData);
          this.cdr.detectChanges();
        }
      },
      error: (err) => console.error('Error loading home data:', err)
    });
  }

  onSubmit(): void {
    if (this.myForm.invalid) return;
    const updatedData: IHome = { ...this.homeData, ...this.myForm.value };
    this.homeService.updateHomeData(updatedData).subscribe({
      next: (response) => {
        if (response.success) {
          alert('Home data updated successfully!');
          this.homeData = response.data;
          this.cdr.detectChanges();
        }
      },
      error: (err) => console.error('Error updating home data:', err)
    });
  }

  onImageUpload(event: Event): void {
    const input = event.currentTarget as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.homeService.uploadImage(input.files[0]).subscribe({
        next: (res) => {
          if (res.success) {
            this.homeData.heroImage = res.imageUrl;
            this.cdr.detectChanges();
          }
        },
        error: (err) => console.error('Upload failed:', err)
      });
    }
  }

  onResumeUpload(event: Event): void {
    const input = event.currentTarget as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.homeService.uploadImage(input.files[0]).subscribe({
        next: (res) => {
          if (res.success) {
            this.homeData.resumePdf = res.imageUrl;
            this.cdr.detectChanges();
          }
        },
        error: (err) => console.error('Resume upload failed:', err)
      });
    }
  }
}
