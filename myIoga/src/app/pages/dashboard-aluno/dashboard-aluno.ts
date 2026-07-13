import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SidebarSharedComponent } from '../../shared/components/sidebar/sidebar';
import { ThemeService } from '../../shared/components/theme-service/theme-service'; // Ajuste o caminho

@Component({
  selector: 'app-dashboard-prof',
  standalone: true,
  imports: [CommonModule, SidebarSharedComponent],
  templateUrls: './dashboard-prof.html',
  styleUrls: './dashboard-prof.css'
})
export class DashboardProf implements OnInit {
  abaAtiva: string = 'agenda';
  sidebarAtiva: boolean = false;

  professorLogado = {
    nome: 'Indra Carvalho',
    foto: '/img/indra.png' 
  };

  aulasAgendadas = [
    { aluno: 'Marcelo Dias', data: '14/07/2026', horario: '08:00', estilo: 'Vinyasa Flow' },
    { aluno: 'Coaty', data: '15/07/2026', horario: '19:30', estilo: 'Hatha Yoga' },
    { aluno: 'Nicholas', data: '17/07/2026', horario: '07:00', estilo: 'Vinyasa Flow' },
    { aluno: 'Luan Estrela', data: '17/07/2026', horario: '07:00', estilo: 'Yoga Meditação' },
    { aluno: 'Gabriel Beer', data: '17/07/2026', horario: '07:00', estilo: 'Hatha Yoga' },
    { aluno: 'Ayran Bufalo', data: '17/07/2026', horario: '07:00', estilo: 'Yoga Meditação' }
  ];

  videosPostados: any[] = [];
  recadosPostados: any[] = [];

  // Injetando o ThemeService caso precise dele no template HTML do dashboard (ex: {{ themeService.isDarkMode() }})
  constructor(private router: Router, public themeService: ThemeService) {}

  ngOnInit() {
    this.carregarDados();
  }

  atualizarParaAvatarPadrao() {
    const caminhoFallback = '/img/indra.png'; 
    if (this.professorLogado.foto !== caminhoFallback) {
      this.professorLogado.foto = caminhoFallback;
    }
  }

  mudarAba(aba: string) {
    this.abaAtiva = aba;
    this.sidebarAtiva = false;
  }

  toggleSidebar() {
    this.sidebarAtiva = !this.sidebarAtiva;
  }

  // Se você tem um botão de alternar tema no HTML deste dashboard, agora basta chamar o serviço:
  toggleTema() {
    this.themeService.toggleTheme();
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
    const vSalvos = localStorage.getItem('@myioga:videos');
    const rSalvos = localStorage.getItem('@myioga:recados');
    if (vSalvos) this.videosPostados = JSON.parse(vSalvos);
    if (rSalvos) this.recadosPostados = JSON.parse(rSalvos);
  }

  sair() {
    this.router.navigate(['/']);
  }
}