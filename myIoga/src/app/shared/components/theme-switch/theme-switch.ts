import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Theme } from '../../service/theme';
@Component({
  selector: 'app-theme-switch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-switch.html',
  styleUrls: ['./theme-switch.css']
})
export class ThemeSwitch {
  constructor(public themeService: Theme) {}

  alterarTema(): void {
    this.themeService.toggleTheme();
  }
}