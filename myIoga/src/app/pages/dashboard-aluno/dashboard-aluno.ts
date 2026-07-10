import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-aluno',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-aluno.html',
  styleUrl: './dashboard-aluno.css'
})
export class DashboardAluno implements OnInit {
  abaAtiva: string = 'mural';
  
  videos: any[] = [];
  recados: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.sincronizarComProfessor();
  }

  mudarAba(aba: string) {
    this.abaAtiva = aba;
  }

  // Captura os dados que o professor postou no painel dele
  sincronizarComProfessor() {
    const dadosVideos = localStorage.getItem('@myioga:videos');
    const dadosRecados = localStorage.getItem('@myioga:recados');

    if (dadosVideos) {
      this.videos = JSON.parse(dadosVideos);
    }
    if (dadosRecados) {
      this.recados = JSON.parse(dadosRecados);
    }
  }

  solicitarAgendamento(data: string, hora: string, estilo: string) {
    if (!data || !estilo) return alert('Por favor, preencha todos os campos do agendamento.');
    
    alert(`🧘 Perfeito! Sua aula de "${estilo}" foi agendada para o dia ${data} às ${hora}.\nO professor foi notificado.`);
  }

  sair() {
    this.router.navigate(['/']); // Retorna à Home
  }
}