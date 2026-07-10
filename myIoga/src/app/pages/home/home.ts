import { Component, Inject, PLATFORM_ID, HostListener, OnInit, OnDestroy } from '@angular/core'; // 👈 Adicionado OnDestroy
import { CommonModule, isPlatformBrowser } from '@angular/common';
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
export class Home implements OnInit, OnDestroy { 
  mostrarLogin = false;
  mostrarCadastro = false;
  mostrarSeta = false;

  slideAtual = 0;
  imagensCarrossel = [
    'img/Yoga-Praia.png',
    'img/yoga1.jpg',
    'img/yoga2.jpg',
    'img/yoga3.jpg'
  ];

  private carrosselTimer: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      const scrollTopo = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      this.mostrarSeta = scrollTopo > 300;
    }
  }

  abrirModalLogin() {
    console.log('Fui chamada! Fechando cadastro e abrindo login...');
    this.mostrarLogin = true;
    this.mostrarCadastro = false;
    console.log('Estado atual - Login:', this.mostrarLogin, 'Cadastro:', this.mostrarCadastro);
  }

  abrirModalCadastro() {
    console.log('Fui chamada! Fechando login e abrindo cadastro...');
    this.mostrarLogin = false; 
    this.mostrarCadastro = true;
    console.log('Estado atual - Login:', this.mostrarLogin, 'Cadastro:', this.mostrarCadastro);
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
    if (isPlatformBrowser(this.platformId)) {
      this.carrosselTimer = setInterval(() => {
        this.proximoSlide();
      }, 5000);
    }
  }

  ngOnDestroy() {
    if (this.carrosselTimer) {
      clearInterval(this.carrosselTimer);
    }
  }
}