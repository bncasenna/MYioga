import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SidebarSharedComponent } from '../../shared/components/sidebar/sidebar';
import { Theme } from '../../shared/service/theme';
import { ThemeSwitch } from "../../shared/components/theme-switch/theme-switch";
import { PerfilComponent } from '../../shared/components/perfil/perfil';

@Component({
  selector: 'app-dashboard-aluno',
  standalone: true,
  imports: [CommonModule, SidebarSharedComponent, ThemeSwitch, PerfilComponent],
  templateUrl: './dashboard-aluno.html',
  styleUrl: './dashboard-aluno.css'
})
export class DashboardAlunoComponent implements OnInit {
  abaAtiva: string = 'mural'; 
  sidebarAtiva: boolean = false; 

  alunoLogado = {
    nome: 'Marcello', 
    sobrenome: 'Dias', // ⚙️ Campo adicionado para a edição
    foto: '/img/marcelo.svg',
    bio: '' // ⚙️ Campo adicionado para a edição
  };
  
  videos: any[] = [];
  recados: any[] = [];

  // ⚙️ Controle de exibição do modal de perfil
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
     LÓGICA DE GERENCIAMENTO DE PERFIL (MODAL COMPARTILHADO)
     ========================================================================== */

  abrirModalPerfil(): void {
    this.mostrarModalPerfil = true;
  }

  fecharModalPerfil(): void {
    this.mostrarModalPerfil = false;
  }

  salvarPerfil(dadosAtualizados: any): void {
    this.alunoLogado = {
      ...this.alunoLogado,
      nome: dadosAtualizados.nome,
      sobrenome: dadosAtualizados.sobrenome,
      bio: dadosAtualizados.bio,
      foto: dadosAtualizados.foto
    };

    // Salva o estado atualizado do aluno no localStorage temporariamente
    localStorage.setItem('@myioga:aluno', JSON.stringify(this.alunoLogado));
    
    this.fecharModalPerfil();
    alert('Perfil atualizado com sucesso!');
  }

  /* ==========================================================================
     PERSISTÊNCIA E AUXILIARES
     ========================================================================== */

  carregarDados() {
    // Sincroniza dados postados pelo professor
    const dadosVideos = localStorage.getItem('@myioga:videos');
    const dadosRecados = localStorage.getItem('@myioga:recados');
    if (dadosVideos) this.videos = JSON.parse(dadosVideos);
    if (dadosRecados) this.recados = JSON.parse(dadosRecados);

    // Carrega dados salvos do próprio aluno
    const dadosPerfil = localStorage.getItem('@myioga:aluno');
    if (dadosPerfil) {
      this.alunoLogado = JSON.parse(dadosPerfil);
    }
  }

  solicitarAgendamento(data: string, hora: string, estilo: string) {
    if (!data || !hora || !estilo) return alert('Por favor, preencha todos os campos do agendamento.');
    alert(`🧘 Perfeito! Sua aula de "${estilo}" foi agendada para o dia ${data} às ${hora}.\nO professor foi notificado.`);
  }

  sair() {
    this.router.navigate(['/']); 
  }
}