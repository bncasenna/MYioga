import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class Cadastro implements OnInit {
  @Output() fecharModal = new EventEmitter<void>();
  @Output() alternarParaLogin = new EventEmitter<void>();

  cadastroForm!: FormGroup;

  ngOnInit(): void {
    this.cadastroForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      sobrenome: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      dataNascimento: new FormControl(''),
      senha: new FormControl('', [Validators.required, Validators.minLength(6)]),
      perfil: new FormControl('', [Validators.required]),
      aceitaLGPD: new FormControl(false, [Validators.requiredTrue]) // Garante conformidade com a LGPD
    });
  }

  fechar() {
    this.fecharModal.emit(); 
  }

  irParaLogin() {
    this.alternarParaLogin.emit(); 
  }

  bloquearLetras(event: KeyboardEvent) {
    const permitidos = [
      'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 
      'Home', 'End', 'Control'
    ];

    if (event.ctrlKey || event.metaKey) {
      return;
    }

    if (!/[0-9]/.test(event.key) && !permitidos.includes(event.key)) {
      event.preventDefault();
    }
  }

  filtrarApenasNumeros(event: any) {
    const valorOriginal = event.target.value;
    const apenasNumeros = valorOriginal.replace(/[^0-9]/g, '');
    
    this.cadastroForm.get('cpf')?.setValue(apenasNumeros, { emitEvent: false });
    event.target.value = apenasNumeros;
  }

  submeterCadastro() {
    if (this.cadastroForm.valid) {
      console.log('Dados do cadastro enviados com sucesso:', this.cadastroForm.value);
      alert('Cadastro realizado com sucesso!');
      this.fechar();
    } else {
      alert('Por favor, preencha todos os campos obrigatórios corretamente e aceite os termos da LGPD.');
    }
  }
}