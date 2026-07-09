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

  fechar() {
    this.fecharModal.emit(); 
  }

  irParaLogin() {
    this.alternarParaLogin.emit(); 
  }
}