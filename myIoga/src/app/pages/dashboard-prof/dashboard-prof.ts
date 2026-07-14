import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SidebarSharedComponent } from '../../shared/components/sidebar/sidebar';
import { Theme } from '../../shared/service/theme';
import { ThemeSwitch } from "../../shared/components/theme-switch/theme-switch";
import { PerfilComponent } from '../../shared/components/perfil/perfil';

@Component({
  selector: 'app-dashboard-prof',
  standalone: true,
  imports: [
    CommonModule, 
    SidebarSharedComponent, 
    ThemeSwitch, 
    PerfilComponent 
  ], 
  templateUrl: './dashboard-prof.html',
  styleUrl: './dashboard-prof.css'
})
export class DashboardProfComponent implements OnInit {
  abaAtiva: string = 'agenda';
  sidebarAtiva: boolean = false; 

  professorLogado = {
    nome: 'Indra', 
    sobrenome: 'Carvalho',
    foto: '/img/indra.png',
    bio: ''
  };
  
  aulasAgendadas = [
    { aluno: 'Marcello Dias', data: '14/07/2026', horario: '15:00', estilo: 'Vinyasa Flow' },
    { aluno: 'Coaty', data: '15/07/2026', horario: '07:30', estilo: 'Hatha Yoga' },
    { aluno: 'Nicholas', data: '20/07/2026', horario: '13:00', estilo: 'Meditação Guiada' }
  ];

  videosPostados: any[] = [];
  recadosPostados: any[] = [];

  mostrarModalPerfil: boolean = false;

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

  /* ==========================================================================
     LÓGICA DE UPLOAD E RECADOS
     ========================================================================== */

  postarVideo(titulo: string, categoria: string, arquivos: FileList | null) {
    if (!titulo.trim()) {
      return alert('Por favor, insira um título para a aula!');
    }

    if (!arquivos || arquivos.length === 0) {
      return alert('Por favor, selecione um arquivo de vídeo do seu computador!');
    }

    const arquivoSelecionado = arquivos[0];

    const novoVideo = { 
      titulo, 
      categoria,
      nomeArquivo: arquivoSelecionado.name, 
      data: new Date().toLocaleDateString('pt-BR') 
    };

    this.videosPostados.unshift(novoVideo);
    localStorage.setItem('@myioga:videos', JSON.stringify(this.videosPostados));
    
    alert(`Sucesso! Vídeo cadastrado na categoria [${categoria}] e disponibilizado.`);
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

  /* ==========================================================================
     LÓGICA DE GERENCIAMENTO DE PERFIL 
     ========================================================================== */

  abrirModalPerfil(): void {
    this.mostrarModalPerfil = true;
  }

  fecharModalPerfil(): void {
    this.mostrarModalPerfil = false;
  }

  salvarPerfil(dadosAtualizados: any): void {
    this.professorLogado = {
      ...this.professorLogado,
      nome: dadosAtualizados.nome,
      sobrenome: dadosAtualizados.sobrenome,
      bio: dadosAtualizados.bio,
      foto: dadosAtualizados.foto
    };

    localStorage.setItem('@myioga:professor', JSON.stringify(this.professorLogado));
    
    this.fecharModalPerfil();
    alert('Perfil atualizado com sucesso!');
  }

  /* ==========================================================================
     PERSISTÊNCIA E AUXILIARES
     ========================================================================== */

  carregarDados() {
    const dadosVideos = localStorage.getItem('@myioga:videos');
    const dadosRecados = localStorage.getItem('@myioga:recados');
    const dadosPerfil = localStorage.getItem('@myioga:professor');

    if (dadosVideos) this.videosPostados = JSON.parse(dadosVideos);
    if (dadosRecados) this.recadosPostados = JSON.parse(dadosRecados);
    
    if (dadosPerfil) {
      this.professorLogado = JSON.parse(dadosPerfil);
    }
  }

  sair() {
    this.router.navigate(['/']); 
  }
}