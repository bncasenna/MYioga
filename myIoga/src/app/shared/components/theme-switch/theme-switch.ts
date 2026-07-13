import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../theme-service/theme-service';
@Component({
  selector: 'app-theme-switch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-switch.html',
  styleUrls: ['./theme-switch.css']
})
export class ThemeSwitch {
  constructor(public themeService: ThemeService) {}

  alterarTema(): void {
    this.themeService.toggleTheme();
  }
}