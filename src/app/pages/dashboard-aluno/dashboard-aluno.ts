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
     LÓGICA DE GERENCIAMENTO DE PERFIL
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
          autor: {
            nome: 'Indra Carvalho',
            foto: '/img/indra.png'
          }
        },
        {
          texto: 'Registro da nossa aula de hoje!! O encontro foi incrivel, pessoal. Namastê!🧘🏾‍♀️',
          data: '12/07/2026 às 08:15',
          midiaUrl: ['/img/alunos1.svg', '/img/alunos2.svg'],
          tipoMidia: 'image',
          autor: {
            nome: 'Bianca Senna',
            foto: '/img/biancaSenna.jpg'
          }
        }
      ];
    }

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

    alert(`🧘 Perfeito! Sua aula de "${estilo}" foi agendada para o dia ${dataFormatada} às ${hora}.\n\nO professor foi notificado.`);
  }

  sair() {
    this.router.navigate(['/']); 
  }
}