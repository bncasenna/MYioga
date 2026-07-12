import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Login } from '../login/login';
import { Cadastro } from "../cadastro/cadastro";
import { ThemeSwitch } from '../theme-switch/theme-switch'; // Ajuste o caminho se necessário

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, Login, Cadastro],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {
alternarModoNoturno() {
throw new Error('Method not implemented.');
}
  mostrarLogin = false;
  mostrarCadastro = false;
  isDarkMode = true; 

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme');
      this.isDarkMode = savedTheme !== 'light';
      this.atualizarClasseTema();
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

  receberAlternanciaTema(switchModoClaro: boolean) {
    this.isDarkMode = !switchModoClaro;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
      this.atualizarClasseTema();
    }
  }

  private atualizarClasseTema() {
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark-theme');
      document.documentElement.classList.remove('light-theme');
    } else {
      document.documentElement.classList.add('light-theme');
      document.documentElement.classList.remove('dark-theme');
    }
  }
}