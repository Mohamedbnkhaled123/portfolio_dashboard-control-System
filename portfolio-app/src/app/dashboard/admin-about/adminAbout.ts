import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AboutService } from '../../services/about.service';
import { IAbout } from '../../pages/about/about.model';

@Component({
  selector: 'app-admin-about',
  imports: [ReactiveFormsModule],
  templateUrl: './adminAbout.html',
  styleUrl: './adminAbout.css',
})
export class AdminAbout implements OnInit {
  aboutData!: IAbout;
  myForm!: FormGroup;

  constructor(private aboutService: AboutService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      aboutBadge: new FormControl(''),
      mainTitle:  new FormControl('', [Validators.required]),
      aboutDsc:   new FormControl(''),
    });

    this.aboutService.getAboutData().subscribe({
      next: (response) => {
        if (response.success) {
          this.aboutData = response.data;
          this.myForm.patchValue(this.aboutData);
          this.cdr.detectChanges();
        }
      },
      error: (err) => console.error('Error loading about data:', err)
    });
  }

  onSubmit(): void {
    if (this.myForm.invalid) return;
    const updatedData: IAbout = { ...this.aboutData, ...this.myForm.value };
    this.aboutService.updateAboutData(updatedData).subscribe({
      next: (response) => {
        if (response.success) {
          alert('About data updated successfully!');
          this.aboutData = response.data;
          this.cdr.detectChanges();
        }
      },
      error: (err) => console.error('Error updating about data:', err)
    });
  }

  onImageUpload(event: Event): void {
    const input = event.currentTarget as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.aboutService.uploadImage(input.files[0]).subscribe({
        next: (res) => {
          if (res.success) {
            this.aboutData.aboutImage = res.imageUrl;
            this.cdr.detectChanges();
          }
        },
        error: (err) => console.error('Upload failed:', err)
      });
    }
  }
}
