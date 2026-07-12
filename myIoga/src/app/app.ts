import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet], 
  template: '<router-outlet></router-outlet>'
})
export class App implements OnInit{ 
  ngOnInit() {
    this.verificarTemaGlobal();
  }

  verificarTemaGlobal() {
    const temaSalvo = localStorage.getItem('theme');
    
    if (!temaSalvo || temaSalvo === 'dark') {
      document.documentElement.classList.add('dark-theme');
      document.documentElement.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark'); // Garante o registro inicial
    } else {
      document.documentElement.classList.add('light-theme');
      document.documentElement.classList.remove('dark-theme');
    }
  }
}