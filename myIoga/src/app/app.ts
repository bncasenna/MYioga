import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router'; 
import { Theme } from './shared/service/theme';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet], 
  template: '<router-outlet></router-outlet>'
})

export class App implements OnInit{ 

  constructor(private themeService: Theme) {}

  ngOnInit() {}
}