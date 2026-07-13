import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SidebarSharedComponent } from '../../shared/components/sidebar/sidebar';
import { ThemeService } from '../../shared/components/theme-service/theme-service'; // Ajuste o caminho

@Component({
  selector: 'app-dashboard-aluno',
  standalone: true,
  imports: [CommonModule, SidebarSharedComponent],
  templateUrls: './dashboard-aluno.html',
  styleUrls: './dashboard-aluno.css'
})
export class DashboardAluno implements OnInit {
  abaAtiva: string = 'mural';
  sidebarAtiva: boolean = false; 

  alunoLogado: any = {
    nome: 'Mariana Silva', 
    foto: '' 
  };
  
  videos: any[] = [];
  recados: any[] = [];

  constructor(private router: Router, public themeService: ThemeService) {}

  ngOnInit() {
    this.sincronizarComProfessor();
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