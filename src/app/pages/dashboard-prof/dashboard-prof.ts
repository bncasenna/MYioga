import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { SidebarSharedComponent } from '../../shared/components/sidebar/sidebar';
import { Theme } from '../../shared/service/theme';
import { ThemeSwitch } from "../../shared/components/theme-switch/theme-switch";
import { PerfilComponent } from '../../shared/components/perfil/perfil';
import { AuthService } from '../../shared/service/auth-service';

@Component({
  selector: 'app-dashboard-prof',
  standalone: true,
  imports: [CommonModule, SidebarSharedComponent, ThemeSwitch, PerfilComponent],
  templateUrl: './dashboard-prof.html',
  styleUrl: './dashboard-prof.css'
})
export class DashboardProfComponent implements OnInit {
  private authService = inject(AuthService);

  abaAtiva: string = 'mural';
  sidebarAtiva: boolean = false;

  professorLogado: any = {
    nome: 'Indra',
    sobrenome: 'Carvalho',
    foto: '/img/indra.png',
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
    const usuarioSessaoProf = this.authService.getUsuarioAtual();
    const emailChave = usuarioSessaoProf?.email || 'prof@myioga.com';

    this.professorLogado = {
      ...this.professorLogado,
      nome: dadosAtualizados.nome,
      sobrenome: dadosAtualizados.sobrenome,
      bio: dadosAtualizados.bio,
      foto: dadosAtualizados.foto
    };

    localStorage.setItem(`@myioga:professor:${emailChave}`, JSON.stringify(this.professorLogado));
    
    this.fecharModalPerfil();
    alert('Perfil atualizado com sucesso!');
  }

  carregarDados() {
    const dadosVideos = localStorage.getItem('@myioga:videos');
    if (dadosVideos) this.videos = JSON.parse(dadosVideos);

    const dadosRecados = localStorage.getItem('@myioga:recados');
    if (dadosRecados) {
      this.recados = JSON.parse(dadosRecados);
    } else {
      this.recados = [
        {
          texto: 'Olá, pessoal! Lembrem-se de que nosso aulão ao ar livre de alinhamento de chakras será nesta sexta-feira, no Porto da Barra ás 06:30. Tragam suas toalhas e garrafas de água! 🧘‍♀️✨',
          data: '14/07/2026 às 05:30',
          midiaUrl: [],
          tipoMidia: '',
          autor: { nome: 'Indra Carvalho', foto: '/img/indra.png' }
        }
      ];
    }

    const dadosAgendamentos = localStorage.getItem('@myioga:agendamentos-aluno');
    if (dadosAgendamentos) this.aulasAgendadas = JSON.parse(dadosAgendamentos);

    // ==========================================
    // LÓGICA DE AUTENTICAÇÃO  POR E-MAIL
    // ==========================================
    const usuarioSessaoProf = this.authService.getUsuarioAtual();

    if (usuarioSessaoProf) {
      const emailLogado = usuarioSessaoProf.email;

      if (emailLogado === 'prof@myioga.com') {
        const dadosPerfilIndra = localStorage.getItem('@myioga:professor:prof@myioga.com');
        if (dadosPerfilIndra) {
          this.professorLogado = JSON.parse(dadosPerfilIndra);
        } else {
          this.professorLogado = {
            nome: 'Indra',
            sobrenome: 'Carvalho',
            foto: '/img/indra.png',
            bio: ''
          };
        }
      } 
      else {
        const dadosPerfilOutro = localStorage.getItem(`@myioga:professor:${emailLogado}`);
        if (dadosPerfilOutro) {
          this.professorLogado = JSON.parse(dadosPerfilOutro);
        } else {
          this.professorLogado = {
            nome: (usuarioSessaoProf as any).nome || emailLogado.split('@')[0],
            sobrenome: (usuarioSessaoProf as any).sobrenome || '',
            foto: (usuarioSessaoProf as any).foto || '/img/none.svg',
            bio: ''
          };
        }
      }
    }
  }

  publicarRecado(texto: string) {
    if (!texto.trim()) return alert('Escreva uma mensagem antes de publicar.');
    const novoRecado = {
      texto: texto,
      data: 'Hoje às ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      midiaUrl: [],
      tipoMidia: '',
      autor: {
        nome: this.professorLogado.nome + ' ' + (this.professorLogado.sobrenome || ''),
        foto: this.professorLogado.foto
      }
    };
    this.recados.unshift(novoRecado);
    localStorage.setItem('@myioga:recados', JSON.stringify(this.recados));
    alert('Recado publicado com sucesso!');
  }

  publicarVideo(titulo: string, categoria: string) {
    if (!titulo.trim()) return alert('Insira o título da video-aula.');
    const novoVideo = { titulo: titulo, categoria: categoria, data: new Date().toLocaleDateString() };
    this.videos.unshift(novoVideo);
    localStorage.setItem('@myioga:videos', JSON.stringify(this.videos));
    alert('Vídeo-aula liberada!');
  }

  alterarStatusAula(index: number, novoStatus: string) {
    if (this.aulasAgendadas[index]) {
      this.aulasAgendadas[index].status = novoStatus;
      localStorage.setItem('@myioga:agendamentos-aluno', JSON.stringify(this.aulasAgendadas));
    }
  }

  sair() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}