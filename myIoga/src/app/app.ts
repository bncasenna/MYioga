import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router'; 
import { ThemeService } from '../../src/app/shared/components/theme-service/theme-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet], 
  template: '<router-outlet></router-outlet>'
})

export class App implements OnInit{ 

  constructor(private themeService: ThemeService) {}

  ngOnInit() {}
}