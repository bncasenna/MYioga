import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { AuthService } from '../../service/auth-service';
import { IUsuario } from '../../interfaces/iusuario';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

alert(arg0: string) {
throw new Error('Method not implemented.');
}
  @Output() fecharModal = new EventEmitter<void>();
  @Output() alternarParaCadastro = new EventEmitter<void>();

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private router: Router, private auth: AuthService) {}

  fechar(): void {
    this.fecharModal.emit();
  }

  irParaCadastro(): void {
    this.alternarParaCadastro.emit();
  }

  submeterLogin(): void {
    if (this.loginForm.valid) {
      const formData = {
        email: this.loginForm.value.email,
        senha: this.loginForm.value.senha
      }; 
      this.auth.login(formData).subscribe({
      next: (response)=>{
        this.router.navigate(["/dashboard-prof"])
      }
      })
    }
}}