import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Header } from './shared/header/header';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, RouterLink, Header],
  templateUrl: './adminDashboard.html',
  styleUrl: './adminDashboard.css',
  encapsulation: ViewEncapsulation.None
})
export class AdminDashboard {}
