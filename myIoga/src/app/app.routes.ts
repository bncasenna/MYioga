import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { DashboardAluno } from './pages/dashboard-aluno/dashboard-aluno';
import { DashboardProf } from './pages/dashboard-prof/dashboard-prof';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'dashboard-aluno', component: DashboardAluno },
  { path: 'dashboard-prof', component: DashboardProf },
  { path: '**', redirectTo: '' }
];