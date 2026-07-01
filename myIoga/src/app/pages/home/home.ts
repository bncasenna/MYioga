import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../shared/components/header/header';
import { Login } from '../../shared/components/login/login'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Header, Login],
  templateUrl: './home.html',
  styleUrl: './home.css' 
})
export class Home { 
  mostrarLogin = false; 

  abrirModalLogin() {
    this.mostrarLogin = true;
  }
}