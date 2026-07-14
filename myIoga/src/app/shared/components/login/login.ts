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

  // Permite que o template HTML chame alert('mensagem') sem quebrar a compilação
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
        next: (response) => {
          this.fechar(); // Fecha o modal se o login for bem-sucedido
          this.router.navigate(["/dashboard-prof"]);
        },
        error: (err) => {
          this.alert('Email ou senha inválidos!');
          console.error(err);
        }
      });
    }
  }
}