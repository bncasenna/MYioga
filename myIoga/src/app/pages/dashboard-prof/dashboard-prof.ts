import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/components/header/header';

@Component({
  selector: 'app-dashboard-prof',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './dashboard-prof.html',
  styleUrls: ['./dashboard-prof.css']
})
export class DashboardProfComponent { }