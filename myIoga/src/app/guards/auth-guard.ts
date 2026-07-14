import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService, UserRole } from '../shared/service/auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLogged()) {
    return router.createUrlTree(['/home']); 
  }

  // Captura a role do usuário logado diretamente do AuthService
  const userRole: UserRole = auth.getUserRole();

  const expectedRoles = route.data['roles'] as UserRole[]; 

  if (expectedRoles && expectedRoles.includes(userRole)) {
    return true;
  }

  // Redirecionamentos caso o usuário não tenha permissão específica para a rota solicitada
  if (userRole === "professor") {
    return router.createUrlTree(['/dashboard-prof']);
  }

  if (userRole === "aluno") {
    return router.createUrlTree(['/dashboard-aluno']);
  }

  return router.createUrlTree(['/home']);
};