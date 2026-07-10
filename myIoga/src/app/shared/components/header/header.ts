import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Login } from '../login/login';
import { Cadastro } from "../cadastro/cadastro";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, Login, Cadastro],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {
  mostrarLogin = false;
  isDarkMode = true; 
mostrarCadastro: any;

constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme');
      
      if (savedTheme === 'light') {
        this.isDarkMode = false;
        document.documentElement.classList.remove('dark-theme');
      } else {
        this.isDarkMode = true;
        document.documentElement.classList.add('dark-theme');
      }
    }
  }

  abrirModalLogin() {
    this.mostrarCadastro = false;
    this.mostrarLogin = true;
  }

  abrirModalCadastro() {
    this.mostrarLogin = false;
    this.mostrarCadastro = true;
  }

  fecharModais() {
    this.mostrarLogin = false;
    this.mostrarCadastro = false;
  }

  alternarModoNoturno() {
    this.isDarkMode = !this.isDarkMode;

    if (isPlatformBrowser(this.platformId)) {
      if (this.isDarkMode) {
        document.documentElement.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
      }
    }
  }
}