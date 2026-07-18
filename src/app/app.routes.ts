import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { DashboardAlunoComponent } from './pages/dashboard-aluno/dashboard-aluno';
import { DashboardProfComponent } from './pages/dashboard-prof/dashboard-prof';
import { authGuard } from './guards/auth-guard';
import { LGPD } from './pages/lgpd/lgpd';

export const routes: Routes = [
  { path: '', component: Home },
  
  { 
    path: 'dashboard-aluno', 
    canActivate: [authGuard], 
    data: { roles: ['aluno'] }, 
    component: DashboardAlunoComponent 
  },
  { 
    path: 'dashboard-prof', 
    canActivate: [authGuard], 
    data: { roles: ['professor'] }, 
    component: DashboardProfComponent 
  },

  {
    path: 'lgpd',
    component: LGPD
  },
  
  { path: '**', redirectTo: '' }
];