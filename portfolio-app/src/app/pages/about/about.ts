import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AboutService } from '../../services/about.service';
import { IAbout } from './about.model';
@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements OnInit {
  aboutData!: IAbout;
  constructor(private aboutService: AboutService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.aboutService.getAboutData().subscribe({
      next: (response) => {
        if (response.success) {
          
          this.aboutData = response.data;
          console.log(this.aboutData);
          this.cdr.detectChanges();
        }
      },
      error: (err) => console.error('Error loading about data:', err)
    })
  }
}
