import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService, UserRole } from '../shared/service/auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // 1. Verifica se o usuário NÃO está logado
  if (!auth.isLogged()) {
    return router.createUrlTree(['/home']); // Redireciona para home de forma segura usando UrlTree
  }

  const expectedRoles = route.data['roles'] as UserRole[]; // Corrigido erro de digitação
  const userRole = auth.getUserRole();

  // 2. Se o usuário tem o cargo necessário, permite o acesso
  if (expectedRoles && expectedRoles.includes(userRole)) {
    return true;
  }

  // 3. Se não tem permissão para esta rota específica, redireciona conforme o cargo dele
  if (userRole === "professor") {
    return router.createUrlTree(['/dashboard-prof']);
  }

  if (userRole === "aluno") {
    return router.createUrlTree(['/dashboard-aluno']);
  }

  // 4. Fallback de segurança obrigatório para retornar um booleano/UrlTree
  return router.createUrlTree(['/home']);
};