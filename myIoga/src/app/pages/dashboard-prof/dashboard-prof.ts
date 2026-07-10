import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-prof',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-prof.html',
  styleUrl: './dashboard-prof.css'
})
export class DashboardProf implements OnInit {
  abaAtiva: string = 'agenda';

  // Banco de dados simulado para a agenda do professor
  aulasAgendadas = [
    { aluno: 'Mariana Silva', data: '14/07/2026', horario: '08:00', estilo: 'Vinyasa Flow' },
    { aluno: 'Carlos Eduardo', data: '15/07/2026', horario: '19:30', estilo: 'Hatha Yoga' },
    { aluno: 'Beatriz Costa', data: '17/07/2026', horario: '07:00', estilo: 'Yoga Meditação' }
  ];

  videosPostados: any[] = [];
  recadosPostados: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.carregarDados();
  }

  mudarAba(aba: string) {
    this.abaAtiva = aba;
  }

  // Publica a aula e envia o sinal para o "banco de dados" compartilhado
  postarVideo(titulo: string, url: string) {
    if (!titulo || !url) return alert('Preencha todos os campos do vídeo!');
    
    const novoVideo = {
      titulo: titulo,
      url: url,
      data: new Date().toLocaleDateString('pt-BR')
    };

    this.videosPostados.unshift(novoVideo);
    localStorage.setItem('@myioga:videos', JSON.stringify(this.videosPostados));
    alert('Sucesso! Vídeo-aula disponibilizada no painel dos alunos.');
  }

  //  mural de recados compartilhado
  postarRecado(texto: string) {
    if (!texto) return alert('Digite alguma mensagem antes de postar!');

    const novoRecado = {
      texto: texto,
      data: new Date().toLocaleDateString('pt-BR') + ' às ' + new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})
    };

    this.recadosPostados.unshift(novoRecado);
    localStorage.setItem('@myioga:recados', JSON.stringify(this.recadosPostados));
    alert('Sucesso! Recado publicado no Mural do Aluno.');
  }

  carregarDados() {
    const vSalvos = localStorage.getItem('@myioga:videos');
    const rSalvos = localStorage.getItem('@myioga:recados');
    
    if (vSalvos) this.videosPostados = JSON.parse(vSalvos);
    if (rSalvos) this.recadosPostados = JSON.parse(rSalvos);
  }

  sair() {
    this.router.navigate(['/']);
  }
}