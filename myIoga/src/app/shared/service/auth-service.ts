import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { IUsuario } from '../interfaces/iusuario';
import { map, Observable, tap } from 'rxjs';

const usuario_key = 'auth-user'

export type UserRole= 'professor' | 'aluno' | 'convidado'

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private currentUserRole  = ''

  private http = inject(HttpClient)

  private jsonURL = "assets/users.json"

  currentUser = signal<IUsuario | null>(null);

  login(usuarioData : Pick<IUsuario, 'email' | 'senha'>): Observable<IUsuario | undefined>{
    return this.http.get<IUsuario[]>(this.jsonURL).pipe(
      map((usuario: IUsuario[])=>{
        const usuarioEncontrado = usuario.find(
          u=> String(u.email).trim() === String(usuarioData.email).trim() &&
          String(u.senha).trim() === String(usuarioData.senha).trim()
        );
        if(!usuarioEncontrado){
          throw new Error('usuario não encontrado');
        }
        return usuarioEncontrado;
      }),
      tap((usuarioAut : IUsuario)=>{
        localStorage.setItem(usuario_key, JSON.stringify(usuarioAut));
      })
    )
  }

  logout(){
    localStorage.removeItem(usuario_key)
    this.currentUser.set(null)
  }

  getUserRole(){
    return this.currentUser()?.tipo
  }

  isLogged(): boolean{
    return this.currentUserRole !== 'convidado'
  }
}
