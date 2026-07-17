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
    sobrenome: 'Dias', 
    foto: '/img/marcelo.svg',
    bio: '' 
  };
  
  videos: any[] = [];
  recados: any[] = [];
  
  aulasAgendadas: any[] = [
    { estilo: 'Vinyasa Flow', data: '14/07/2026', horario: '15:00', status: 'confirmado' },
    { estilo: 'Meditação Guiada', data: '20/07/2026', horario: '13:00', status: 'cancelado' }
  ];

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

    localStorage.setItem('@myioga:aluno', JSON.stringify(this.alunoLogado));
    
    this.fecharModalPerfil();
    alert('Perfil updated com sucesso!');
  }

  /* ==========================================================================
     PERSISTÊNCIA E AUXILIARES
     ========================================================================== */

  carregarDados() {
    const dadosVideos = localStorage.getItem('@myioga:videos');
    const dadosRecados = localStorage.getItem('@myioga:recados');
    if (dadosVideos) this.videos = JSON.parse(dadosVideos);
    if (dadosRecados) this.recados = JSON.parse(dadosRecados);

    const dadosAgendamentos = localStorage.getItem('@myioga:agendamentos-aluno');
    if (dadosAgendamentos) {
      this.aulasAgendadas = JSON.parse(dadosAgendamentos);
    }

    const dadosPerfil = localStorage.getItem('@myioga:aluno');
    if (dadosPerfil) {
      this.alunoLogado = JSON.parse(dadosPerfil);
    }
  }

  solicitarAgendamento(data: string, hora: string, estilo: string) {
    if (!data || !hora || !estilo.trim()) {
      return alert('Por favor, preencha todos os campos do agendamento.');
    }

    const dataFormatada = data.split('-').reverse().join('/');

    const novoAgendamento = {
      estilo: estilo,
      data: dataFormatada,
      horario: hora,
      status: 'confirmado' 
    };

    this.aulasAgendadas.unshift(novoAgendamento);
    localStorage.setItem('@myioga:agendamentos-aluno', JSON.stringify(this.aulasAgendadas));

    alert(`🧘 Perfeito! Sua aula de "${estilo}" foi agendada para o dia ${dataFormatada} às ${hora}.\n
      O professor foi notificado.`);
  }

  sair() {
    this.router.navigate(['/']); 
  }
}