import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SidebarSharedComponent } from '../../shared/components/sidebar/sidebar';
import { Theme } from '../../shared/service/theme';
import { ThemeSwitch } from "../../shared/components/theme-switch/theme-switch";

@Component({
  selector: 'app-dashboard-prof',
  standalone: true,
  imports: [CommonModule, SidebarSharedComponent, ThemeSwitch],
  templateUrl: './dashboard-prof.html',
  styleUrl: './dashboard-prof.css'
})
export class DashboardProfComponent implements OnInit {
  abaAtiva: string = 'agenda';
  sidebarAtiva: boolean = false; 

  professorLogado = {
    nome: 'Indra Carvalho', 
    foto: '/img/indra.png' 
  };
  
  aulasAgendadas = [
    { aluno: 'Marcelo Dias', data: '14/07/2026', horario: '08:00', estilo: 'Vinyasa Flow' },
    { aluno: 'Coaty', data: '15/07/2026', horario: '19:30', estilo: 'Hatha Yoga' }
  ];

  videosPostados: any[] = [];
  recadosPostados: any[] = [];

  constructor(private router: Router, public themeService: Theme) {}

  ngOnInit() {
    this.carregarDados();
  }

  toggleTema() {
    this.themeService.toggleTheme();
  }

  toggleSidebar() {
    this.sidebarAtiva = !this.sidebarAtiva;
  }

  mudarAba(aba: string) {
    this.abaAtiva = aba;
    this.sidebarAtiva = false; 
  }

  postarVideo(titulo: string, url: string) {
    if (!titulo || !url) return alert('Preencha todos os campos do vídeo!');
    const novoVideo = { titulo, url, data: new Date().toLocaleDateString('pt-BR') };
    this.videosPostados.unshift(novoVideo);
    localStorage.setItem('@myioga:videos', JSON.stringify(this.videosPostados));
    alert('Sucesso! Vídeo-aula disponibilizada no painel dos alunos.');
  }

  postarRecado(texto: string) {
    if (!texto) return alert('Digite alguma mensagem antes de postar!');
    const novoRecado = {
      texto,
      data: new Date().toLocaleDateString('pt-BR') + ' às ' + new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})
    };
    this.recadosPostados.unshift(novoRecado);
    localStorage.setItem('@myioga:recados', JSON.stringify(this.recadosPostados));
    alert('Sucesso! Recado publicado no Mural do Aluno.');
  }

  carregarDados() {
    const dadosVideos = localStorage.getItem('@myioga:videos');
    const dadosRecados = localStorage.getItem('@myioga:recados');
    if (dadosVideos) this.videosPostados = JSON.parse(dadosVideos);
    if (dadosRecados) this.recadosPostados = JSON.parse(dadosRecados);
  }

  sair() {
    this.router.navigate(['/']); 
  }
}