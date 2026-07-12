import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theme-switch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-switch.html',
  styleUrls: ['./theme-switch.css']
})
export class ThemeSwitch {

  @Input() modoClaro = false;
  @Output() aoAlternar = new EventEmitter<boolean>();

  alterarTema(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.aoAlternar.emit(checked);
  }
}