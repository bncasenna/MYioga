import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { SidebarSharedComponent } from '../../shared/components/sidebar/sidebar';
import { Theme } from '../../shared/service/theme';
import { ThemeSwitch } from "../../shared/components/theme-switch/theme-switch";
import { PerfilComponent } from '../../shared/components/perfil/perfil';
import { AuthService } from '../../shared/service/auth-service';

@Component({
  selector: 'app-dashboard-aluno',
  standalone: true,
  imports: [CommonModule, SidebarSharedComponent, ThemeSwitch, PerfilComponent],
  templateUrl: './dashboard-aluno.html',
  styleUrl: './dashboard-aluno.css'
})
export class DashboardAlunoComponent implements OnInit {
  private authService = inject(AuthService); 

  abaAtiva: string = 'mural'; 
  sidebarAtiva: boolean = false; 

  alunoLogado: any = {
    nome: 'Marcello', 
    sobrenome: 'Dias', 
    foto: '/img/marcelo.svg',
    bio: '' 
  };
  
  videos: any[] = [];
  recados: any[] = [];
  aulasAgendadas: any[] = [];
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

  abrirModalPerfil(): void {
    this.mostrarModalPerfil = true;
  }

  fecharModalPerfil(): void {
    this.mostrarModalPerfil = false;
  }

  salvarPerfil(dadosAtualizados: any): void {
    const usuarioSessao = this.authService.getUsuarioAtual();
    const emailChave = usuarioSessao?.email || 'aluno@myioga.com';

    this.alunoLogado = {
      ...this.alunoLogado,
      nome: dadosAtualizados.nome,
      sobrenome: dadosAtualizados.sobrenome,
      bio: dadosAtualizados.bio,
      foto: dadosAtualizados.foto
    };

    localStorage.setItem(`@myioga:aluno:${emailChave}`, JSON.stringify(this.alunoLogado));
    this.fecharModalPerfil();
    alert('Perfil atualizado com sucesso!');
  }

  carregarDados() {
    const dadosVideos = localStorage.getItem('@myioga:videos');
    if (dadosVideos) this.videos = JSON.parse(dadosVideos);

    const dadosRecados = localStorage.getItem('@myioga:recados');
    if (dadosRecados) this.recados = JSON.parse(dadosRecados);

    const dadosAgendamentos = localStorage.getItem('@myioga:agendamentos-aluno');
    if (dadosAgendamentos) this.aulasAgendadas = JSON.parse(dadosAgendamentos);

    // ==========================================
    // LÓGICA DE AUTENTICAÇÃO FIEL POR E-MAIL (ALUNO)
    // ==========================================
    const usuarioSessao = this.authService.getUsuarioAtual();

    if (usuarioSessao) {
      const emailLogado = usuarioSessao.email;

      if (emailLogado === 'aluno@myioga.com' || emailLogado === 'aluno@myioga.com') {
        const dadosPerfilMarcello = localStorage.getItem(`@myioga:aluno:${emailLogado}`);
        if (dadosPerfilMarcello) {
          this.alunoLogado = JSON.parse(dadosPerfilMarcello);
        } else {
          this.alunoLogado = {
            nome: 'Marcello', 
            sobrenome: 'Dias', 
            foto: '/img/marcelo.svg',
            bio: '' 
          };
        }
      } 
      else {
        const dadosPerfilOutro = localStorage.getItem(`@myioga:aluno:${emailLogado}`);
        if (dadosPerfilOutro) {
          this.alunoLogado = JSON.parse(dadosPerfilOutro);
        } else {
          this.alunoLogado = {
            nome: (usuarioSessao as any).nome || emailLogado.split('@')[0],
            sobrenome: (usuarioSessao as any).sobrenome || '',
            foto: (usuarioSessao as any).foto || '/img/none.svg',
            bio: ''
          };
        }
      }
    }
  }

  solicitarAgendamento(data: string, hora: string, estilo: string) {
    if (!data || !hora || !estilo.trim()) return alert('Preencha todos os campos.');
    const dataFormatada = data.split('-').reverse().join('/');
    const novoAgendamento = { estilo: estilo, data: dataFormatada, horario: hora, status: 'confirmado' };
    this.aulasAgendadas.unshift(novoAgendamento);
    localStorage.setItem('@myioga:agendamentos-aluno', JSON.stringify(this.aulasAgendadas));
    alert('Aula agendada com sucesso!');
  }

  sair() {
    this.authService.logout(); 
    this.router.navigate(['/']); 
  }
}