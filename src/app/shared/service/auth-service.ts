import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { IUsuario } from '../interfaces/iusuario';
import { map, Observable, tap } from 'rxjs';

const usuario_key = 'auth-user';

export type UserRole = 'professor' | 'aluno' | 'convidado';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private jsonURL = "assets/users.json";

  // Inicializa o Signal com o usuário salvo no localStorage (se houver)
  currentUser = signal<IUsuario | null>(this.getUsuarioFromStorage());

  private getUsuarioFromStorage(): IUsuario | null {
    const localData = localStorage.getItem(usuario_key);
    return localData ? JSON.parse(localData) : null;
  }

  login(usuarioData: Pick<IUsuario, 'email' | 'senha'>): Observable<IUsuario | undefined> {
    return this.http.get<IUsuario[]>(this.jsonURL).pipe(
      map((usuarios: IUsuario[]) => {
        const usuarioEncontrado = usuarios.find(
          u => String(u.email).trim() === String(usuarioData.email).trim() &&
               String(u.senha).trim() === String(usuarioData.senha).trim()
        );
        if (!usuarioEncontrado) {
          throw new Error('Usuário não encontrado');
        }
        return usuarioEncontrado;
      }),
      tap((usuarioAut: IUsuario) => {
        // Salva no LocalStorage e ATUALIZA o Signal
        localStorage.setItem(usuario_key, JSON.stringify(usuarioAut));
        this.currentUser.set(usuarioAut);
      })
    );
  }

  logout() {
    localStorage.removeItem(usuario_key);
    this.currentUser.set(null);
  }

  getUserRole(): UserRole {
    // Retorna a role do usuário ou 'convidado' se não estiver logado
    return (this.currentUser()?.tipo as UserRole) || 'convidado';
  }

  isLogged(): boolean {
    // Está logado se houver um currentUser ativo e o tipo não for 'convidado'
    const user = this.currentUser();
    return !!user && user.tipo !== 'convidado';
  }
}