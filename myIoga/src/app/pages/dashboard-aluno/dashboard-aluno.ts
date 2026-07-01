import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../shared/components/header/header';

@Component({
  selector: 'app-dashboard-aluno',
  standalone: true,
  imports: [CommonModule, Header],
  templateUrl: './dashboard-aluno.html',
  styleUrls: ['./dashboard-aluno.css']
})
export class DashboardAluno { }