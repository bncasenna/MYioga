import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 

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

  // Formulário Reativo estruturado e validado de acordo com as boas práticas do Angular
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private router: Router) {}

  fechar(): void {
    this.fecharModal.emit();
  }

  irParaCadastro(): void {
    this.alternarParaCadastro.emit();
  }

  submeterLogin(): void {
    if (this.loginForm.valid) {
      const emailDigitado = this.loginForm.value.email;
      const senhaDigitada = this.loginForm.value.senha;
      
      // Credenciais mockadas para a simulação de escopo do projeto
      if (emailDigitado === 'aluno@myioga.com' && senhaDigitada === '123456') {
        this.fechar(); 
        this.router.navigate(['/dashboard-aluno']); 
      } 
      else if (emailDigitado === 'prof@myioga.com' && senhaDigitada === '123456') {
        this.fechar(); 
        this.router.navigate(['/dashboard-prof']); 
      } 
      else {
        alert('Credenciais inválidas! Use aluno@myioga.com ou prof@myioga.com com a senha 123456.');
      }
    } else {
      this.loginForm.markAllAsTouched(); // Exibe os erros visualmente caso o usuário force o envio
    }
  }
}