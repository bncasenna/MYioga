import { Component, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth-service'; 
import { LGPD } from '../../../pages/lgpd/lgpd';
@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LGPD],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class Cadastro implements OnInit {
  @Output() fecharModal = new EventEmitter<void>();
  @Output() alternarParaLogin = new EventEmitter<void>();

  exibirModalLGPD = false;
  esconderSenha: boolean = true;

  private authService = inject(AuthService);

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
      aceitaLGPD: new FormControl(false, [Validators.requiredTrue])
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
      const novosDadosUsuario = this.cadastroForm.value;

      const usuariosExistentes = JSON.parse(localStorage.getItem('users-myIoga') || '[]');

      const usuarioJaExiste = usuariosExistentes.some(
        (u: any) => u.email === novosDadosUsuario.email || u.cpf === novosDadosUsuario.cpf
      );

      if (usuarioJaExiste) {
        alert('Atenção: Este e-mail ou CPF já está cadastrado em nosso sistema!');
        return;
      }

      this.authService.cadastrar(novosDadosUsuario);

      console.log('Dados salvos via AuthService com sucesso:', novosDadosUsuario);
      alert(`Cadastro de ${novosDadosUsuario.nome} realizado com sucesso!`);
      
      this.irParaLogin(); 
    } else {
      alert('Por favor, preencha todos os campos obrigatórios corretamente e aceite os termos da LGPD.');
    }
  }

  abrirLGPD(event: Event) {
    event.preventDefault(); 
    this.exibirModalLGPD = true; 
  }

  fecharLGPD() {
    this.exibirModalLGPD = false;
  }
}