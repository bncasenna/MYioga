import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../shared/components/header/header';

@Component({
  selector: 'app-dashboard-prof',
  standalone: true,
  imports: [CommonModule, Header],
  templateUrl: './dashboard-prof.html',
  styleUrls: ['./dashboard-prof.css']
})
export class DashboardProf { }