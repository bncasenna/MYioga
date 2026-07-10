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
  @Output() fecharModal = new EventEmitter<void>();
  @Output() alternarParaCadastro = new EventEmitter<void>();

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private router: Router) {}

  fechar() {
    this.fecharModal.emit();
  }

  irParaCadastro() {
    this.alternarParaCadastro.emit();
  }

  submeterLogin() {
    if (this.loginForm.valid) {
      const emailDigitado = this.loginForm.value.email;
      const senhaDigitada = this.loginForm.value.senha;
      
      if (emailDigitado === 'aluno@myioga.com' && senhaDigitada === '123456') {
        this.fechar(); 
        this.router.navigate(['/dashboard-aluno']); 
      } 
      
      else if (emailDigitado === 'prof@myioga.com' && senhaDigitada === '123456') {
        this.fechar(); 
        this.router.navigate(['/dashboard-prof']); 
      } 
      
      else {
        alert('Credenciais inválidas! \n\nPara Aluno use: aluno@myioga.com \nPara Professor use: prof@myioga.com \nSenha padrão: 123456');
      }

    } else {
      alert('Por favor, preencha os campos corretamente antes de enviar.');
    }
  }
}