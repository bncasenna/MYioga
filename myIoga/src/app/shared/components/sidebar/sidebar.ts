import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})

export class SidebarSharedComponent {
  @Input() sidebarAtiva: boolean = false;
  @Input() usuario: any; 
  @Input() prefixo: string = ''; 
  
  @Output() aoSair = new EventEmitter<void>();

  avatarPadrao() {
    if (this.usuario) this.usuario.foto = 'img/none.svg';
  }
}