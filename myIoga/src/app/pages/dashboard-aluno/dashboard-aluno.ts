import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SidebarSharedComponent } from '../../shared/components/sidebar/sidebar';

@Component({
  selector: 'app-dashboard-aluno',
  standalone: true,
  imports: [CommonModule, SidebarSharedComponent],
  templateUrl: './dashboard-aluno.html',
  styleUrl: './dashboard-aluno.css'
})
export class DashboardAluno implements OnInit {
  abaAtiva: string = 'mural';
  sidebarAtiva: boolean = false; 
  modoClaro: boolean = false; // 🆕 ADICIONADO para controle de tema

  alunoLogado: any = {
    nome: 'Mariana Silva', 
    foto: '' 
  };
  
  videos: any[] = [];
  recados: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.sincronizarComProfessor();
    this.inicializarTema(); 
  }

  inicializarTema() {
  const temaSalvo = localStorage.getItem('theme');
  
  if (temaSalvo === 'light') {
    this.modoClaro = true;
    document.documentElement.classList.add('light-theme');
    document.documentElement.classList.remove('dark-theme');
  } else {
    this.modoClaro = false;
    document.documentElement.classList.add('dark-theme');
    document.documentElement.classList.remove('light-theme');
  }
}

  toggleTema() {
  this.modoClaro = !this.modoClaro;
  if (this.modoClaro) {
    document.documentElement.classList.remove('dark-theme');
    document.documentElement.classList.add('light-theme');
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.classList.remove('light-theme');
    document.documentElement.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
  }
}

  toggleSidebar() {
    this.sidebarAtiva = !this.sidebarAtiva;
  }

  mudarAba(aba: string) {
    this.abaAtiva = aba;
    this.sidebarAtiva = false; // Fecha a sidebar ao navegar
  }

  sincronizarComProfessor() {
    const dadosVideos = localStorage.getItem('@myioga:videos');
    const dadosRecados = localStorage.getItem('@myioga:recados');
    if (dadosVideos) this.videos = JSON.parse(dadosVideos);
    if (dadosRecados) this.recados = JSON.parse(dadosRecados);
  }

  solicitarAgendamento(data: string, hora: string, estilo: string) {
    if (!data || !estilo) return alert('Por favor, preencha todos os campos do agendamento.');
    alert(`🧘 Perfeito! Sua aula de "${estilo}" foi agendada para o dia ${data} às ${hora}.\nO professor foi notificado.`);
  }

  sair() {
    this.router.navigate(['/']); 
  }
}