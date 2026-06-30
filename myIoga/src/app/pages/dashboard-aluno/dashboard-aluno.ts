import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/components/header/header';

@Component({
  selector: 'app-dashboard-aluno',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './dashboard-aluno.html',
  styleUrls: ['./dashboard-aluno.css']
})
export class DashboardAlunoComponent { }