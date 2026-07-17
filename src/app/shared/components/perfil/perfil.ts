import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class PerfilComponent implements OnInit {
  @Input() usuario: any;

  @Output() aoFechar = new EventEmitter<void>();
  @Output() aoSalvar = new EventEmitter<any>();

  previewFoto: string | null = null;
  dadosEdicao = {
    nome: '',
    sobrenome: '',
    bio: ''
  };

  ngOnInit() {
    if (this.usuario) {
      this.dadosEdicao = {
        nome: this.usuario.nome || '',
        sobrenome: this.usuario.sobrenome || '',
        bio: this.usuario.bio || ''
      };
    }
  }

  onFotoSelecionada(event: any): void {
    const arquivo = event.target.files[0];
    if (arquivo) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewFoto = reader.result as string;
      };
      reader.readAsDataURL(arquivo);
    }
  }

  salvar(): void {
    if (!this.dadosEdicao.nome.trim()) {
      return alert('O nome não pode ficar em branco!');
    }

    const dadosAtualizados = {
      ...this.dadosEdicao,
      foto: this.previewFoto || this.usuario?.foto
    };

    this.aoSalvar.emit(dadosAtualizados);
  }
}