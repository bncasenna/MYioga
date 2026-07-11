import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class Cadastro {
  @Output() fecharModal = new EventEmitter<void>();
  @Output() alternarParaLogin = new EventEmitter<void>();
  cadastroForm: any;

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
}