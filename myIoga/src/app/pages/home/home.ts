import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../shared/components/header/header';
import { Login } from '../../shared/components/login/login'; 
import { Cadastro } from '../../shared/components/cadastro/cadastro';
import { Contato } from '../contato/contato';
import { About } from '../about/about';
import { Footer } from "../../shared/components/footer/footer";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Header, Login, Cadastro, Contato, About, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css' 
})
export class Home implements OnInit { 
  mostrarLogin = false;
  mostrarCadastro = false;

  slideAtual = 0;
  imagensCarrossel = [
    'img/Yoga-Praia.png',
    'img/yoga1.jpg',
    'img/yoga2.jpg',
    'img/yoga3.jpg'
  ];

  abrirModalLogin() {
    this.mostrarLogin = true;
    this.mostrarCadastro = false;
  }

  abrirModalCadastro() {
    this.mostrarCadastro = true;
    this.mostrarLogin = false;
  }

  fecharModais() {
    this.mostrarLogin = false;
    this.mostrarCadastro = false;
  }

  proximoSlide() {
    this.slideAtual = (this.slideAtual + 1) % this.imagensCarrossel.length;
  }

  slideAnterior() {
    this.slideAtual = (this.slideAtual - 1 + this.imagensCarrossel.length) % this.imagensCarrossel.length;
  }

  irParaSlide(index: number) {
    this.slideAtual = index;
  }

  ngOnInit() {
    setInterval(() => {
      this.proximoSlide();
    }, 5000);
  }
}