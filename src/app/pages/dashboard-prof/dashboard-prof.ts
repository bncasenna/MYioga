import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { SidebarSharedComponent } from '../../shared/components/sidebar/sidebar';
import { Theme } from '../../shared/service/theme';
import { ThemeSwitch } from '../../shared/components/theme-switch/theme-switch';
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
    { aluno: 'Marcello Dias', data: '14/07/2026', horario: '15:00', estilo: 'Vinyasa Flow', status: 'confirmado' },
    { aluno: 'Coaty', data: '15/07/2026', horario: '07:30', estilo: 'Hatha Yoga', status: 'confirmado' },
    { aluno: 'Nicholas', data: '20/07/2026', horario: '13:00', estilo: 'Meditação Guiada', status: 'cancelado' }
  ];

  videosPostados: any[] = [];
  
  recadosPostados: any[] = [
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

  mostrarModalPerfil: boolean = false;

  arquivoUpload: File | null = null;
  nomeArquivoSelecionado: string = '';

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

  onArquivoSelecionado(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.arquivoUpload = file;
      this.nomeArquivoSelecionado = file.name;
    }
  }

  postarRecado(textoInput: HTMLTextAreaElement) {
    const text = textoInput.value.trim();

    if (!text && !this.arquivoUpload) {
      return alert('Digite alguma mensagem ou anexe um arquivo antes de postar!');
    }

    let midias: string[] = [];
    let tipoMidia = '';

    if (this.arquivoUpload) {
      midias.push(URL.createObjectURL(this.arquivoUpload));
      tipoMidia = this.arquivoUpload.type.split('/')[0];
    }

    const novoRecado = {
      texto: text,
      data: new Date().toLocaleDateString('pt-BR') + ' às ' + new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'}),
      midiaUrl: midias,
      tipoMidia: tipoMidia,
      autor: {
        nome: `${this.professorLogado.nome} ${this.professorLogado.sobrenome}`,
        foto: this.professorLogado.foto
      }
    };

    this.recadosPostados.unshift(novoRecado);
    localStorage.setItem('@myioga:recados', JSON.stringify(this.recadosPostados));

    textoInput.value = '';
    this.arquivoUpload = null;
    this.nomeArquivoSelecionado = '';

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
    
    if (dadosRecados) {
      this.recadosPostados = JSON.parse(dadosRecados);
    }
    
    if (dadosPerfil) {
      this.professorLogado = JSON.parse(dadosPerfil);
    }
  }

  sair() {
    this.router.navigate(['/']); 
  }
}