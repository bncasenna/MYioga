import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { AuthService } from '../../service/auth-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  @Output() fecharModal = new EventEmitter<void>();
  @Output() alternarParaCadastro = new EventEmitter<void>();

  loginForm = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    senha: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] })
  });

  constructor(private router: Router, private auth: AuthService) {}

  alert(mensagem: string): void {
    window.alert(mensagem);
  }

  fechar(): void {
    this.fecharModal.emit();
  }

  irParaCadastro(): void {
    this.alternarParaCadastro.emit();
  }

  submeterLogin(): void {
    if (this.loginForm.valid) {
      const formData = {
        email: this.loginForm.getRawValue().email,
        senha: this.loginForm.getRawValue().senha
      }; 

      this.auth.login(formData).subscribe({
        next: (usuarioLogado) => {
          this.fechar(); 
          
          if (usuarioLogado && usuarioLogado.tipo === 'professor') {
            this.router.navigate(["/dashboard-prof"]);
          } else {
            this.router.navigate(["/dashboard-aluno"]);
          }
        },
        error: (err) => {
          this.alert('Email ou senha inválidos!');
          console.error(err);
        }
      });
    }
  }
}