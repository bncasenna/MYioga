import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lgpd',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lgpd.html',
  styleUrl: './lgpd.css'
})
export class LGPD {
  @Output() fecharModal = new EventEmitter<void>();

  fechar(): void {
    this.fecharModal.emit();
  }
}