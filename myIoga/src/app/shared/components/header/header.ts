import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Login } from '../login/login';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, Login],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  mostrarLogin = false;
  isDarkMode = false; 

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        this.isDarkMode = true;
        document.documentElement.classList.add('dark-theme');
      }
    }
  }

  abrirModalLogin() {
    this.mostrarLogin = true;
  }

  alternarModoNoturno() {
    this.isDarkMode = !this.isDarkMode;

    if (isPlatformBrowser(this.platformId)) {
      if (this.isDarkMode) {
        document.documentElement.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark'); // Salva a escolha do usuário
      } else {
        document.documentElement.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
      }
    }
  }
}