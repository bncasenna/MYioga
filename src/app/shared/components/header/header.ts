import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Login } from '../login/login';
import { Cadastro } from "../cadastro/cadastro";
import { ThemeSwitch } from '../theme-switch/theme-switch'; 

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, Login, Cadastro, ThemeSwitch], 
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {
  mostrarLogin = false;
  mostrarCadastro = false;
  menuAberto = false; 

  toggleMenu() {
    this.menuAberto = !this.menuAberto;
  }

  abrirModalLogin() {
    this.menuAberto = false;
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
}