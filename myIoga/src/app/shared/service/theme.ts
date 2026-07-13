import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Theme {
  isDarkMode = signal<boolean>(true); 

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.inicializarTema();
  }

  private inicializarTema() {
    if (isPlatformBrowser(this.platformId)) {
      const temaSalvo = localStorage.getItem('theme');
      
      if (!temaSalvo || temaSalvo === 'dark') {
        this.setDarkMode(true);
      } else {
        this.setDarkMode(false);
      }
    }
  }

  toggleTheme() {
    this.setDarkMode(!this.isDarkMode());
  }

  setDarkMode(isDark: boolean) {
    this.isDarkMode.set(isDark);
    
    if (isPlatformBrowser(this.platformId)) {
      const tema = isDark ? 'dark' : 'light';
      localStorage.setItem('theme', tema);
      
      if (isDark) {
        document.documentElement.classList.add('dark-theme');
        document.documentElement.classList.remove('light-theme');
      } else {
        document.documentElement.classList.add('light-theme');
        document.documentElement.classList.remove('dark-theme');
      }
    }
  }
}
