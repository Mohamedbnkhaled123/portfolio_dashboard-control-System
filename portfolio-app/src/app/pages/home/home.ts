import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HomeService } from '../../services/home.service';
import { IHome } from './home.model';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  homeData!: IHome;
 
  constructor(private homeService: HomeService ,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {

    this.homeService.getHomeData().subscribe({
      next: (response) => {
        this.homeData = response.data; 
        this.cdr.detectChanges();
        console.log('Home data fetched:', this.homeData);
      },
      error: (err) => {
        console.error('Error fetching home data:', err);
      }
    });
  }
}
