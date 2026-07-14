import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import Swal from 'sweetalert2';

// Customização global e profissional do alerta nativo
window.alert = (mensagem: string) => {
  // Detecta se o tema claro está ativo; caso contrário, assume o padrão (Tema Escuro)
  const ehTemaClaro = document.documentElement.classList.contains('light-theme');
  const ehSucesso = mensagem.toLowerCase().includes('sucesso');

  Swal.fire({
    text: mensagem,
    icon: ehSucesso ? 'success' : undefined, 
    toast: true,                             
    position: 'top',                         
    showConfirmButton: false,                
    timer: 3000,                             
    timerProgressBar: true,                  
    // Configura as cores baseado no estado de tema do DOM, priorizando o seu escuro padrão
    background: ehTemaClaro 
      ? 'rgba(255, 250, 245, 0.95)' 
      : 'rgba(36, 41, 46, 0.95)', // Corresponde ao seu --smooth do tema escuro            
    color: ehTemaClaro ? '#333333' : '#e0bd9c', // Corresponde ao seu --sand
    customClass: {
      popup: 'notificacao-toast'
    },
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });
};

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));