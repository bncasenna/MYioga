import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { IUsuario } from '../interfaces/iusuario';
import { map, Observable, tap } from 'rxjs';

const usuarioKey = 'auth-user';
const usuariosCadastradosKey = 'users-myIoga'; 

export type UserRole = 'professor' | 'aluno' | 'convidado';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private jsonURL = "assets/users.json";

  currentUser = signal<IUsuario | null>(this.getUsuarioFromStorage());

  private getUsuarioFromStorage(): IUsuario | null {
    const localData = localStorage.getItem(usuarioKey);
    return localData ? JSON.parse(localData) : null;
  }

  // NOVO MÉTODO AUXILIAR: Permite que os dashboards peguem os dados do usuário atual a qualquer momento
  getUsuarioAtual(): IUsuario | null {
    return this.currentUser();
  }

  cadastrar(novoUsuario: any): void {
    const usuariosExistentes = JSON.parse(localStorage.getItem(usuariosCadastradosKey) || '[]');
    
    const usuarioFormatado = {
      ...novoUsuario,
      tipo: novoUsuario.perfil || 'aluno' 
    };

    usuariosExistentes.push(usuarioFormatado);
    localStorage.setItem(usuariosCadastradosKey, JSON.stringify(usuariosExistentes));
  }

  login(usuarioData: Pick<IUsuario, 'email' | 'senha'>): Observable<IUsuario | undefined> {
    return this.http.get<IUsuario[]>(this.jsonURL).pipe(
      map((usuariosJson: IUsuario[]) => {

        const usuariosCadastrados: IUsuario[] = JSON.parse(
          localStorage.getItem(usuariosCadastradosKey) || '[]'
        );

        const todosUsuarios = [...usuariosJson, ...usuariosCadastrados];

        const usuarioEncontrado = todosUsuarios.find(
          u => String(u.email).trim() === String(usuarioData.email).trim() &&
               String(u.senha).trim() === String(usuarioData.senha).trim()
        );

        if (!usuarioEncontrado) {
          throw new Error('Usuário não encontrado');
        }
        return usuarioEncontrado;
      }),
      tap((usuarioAut: IUsuario) => {
        localStorage.setItem(usuarioKey, JSON.stringify(usuarioAut));
        this.currentUser.set(usuarioAut);
      })
    );
  }

  logout() {
    localStorage.removeItem(usuarioKey);
    this.currentUser.set(null);
  }

  getUserRole(): UserRole {
    return (this.currentUser()?.tipo as UserRole) || 'convidado';
  }

  isLogged(): boolean {
    const user = this.currentUser();
    return !!user && user.tipo !== 'convidado';
  }
}