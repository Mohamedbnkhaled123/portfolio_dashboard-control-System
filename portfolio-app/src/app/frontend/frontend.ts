import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../shared/header/header';

@Component({
  selector: 'app-frontend',
  imports: [RouterOutlet, Header],
  templateUrl: './frontend.html',
  styleUrl: './frontend.css',
})
export class Frontend {}
