import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit, OnDestroy {
  mensajes: any[] = []; // Array para los mensajes recibidos
  mensaje: string = ''; // Mensaje a enviar
  username: string = ''; // NickName
  color: string = this.getRandomColor();
  conectado: boolean = false;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    // Regoge el nombre del usuario del localStorage enviado por el login
    this.username = localStorage.getItem('username') || 'Usuario Anonimo';
    console.log('nombre de usuario del localStorage: ', this.username);

    this.conectar();

    this.chatService.getMessages().subscribe((mensaje) => {
      console.log('Nuevo mensaje recibido: ', mensaje);
      this.mensajes.push(mensaje); // Actualiza el array de mensajes
      console.log('Mensajes actuales: ', this.mensajes);
    });
  }

  ngOnDestroy(): void {
    this.chatService.desconectar();
  }

  enviarMensaje() {
    const nuevoMensaje = {
      autor: this.username || 'Usuario Anonimo',
      username: this.username || 'Usuario Anonimo',
      color: this.color,
      contenido: this.mensaje,
    };
    this.chatService.sendMessage(nuevoMensaje);
    this.mensajes.push(nuevoMensaje); // Añadir el mensaje al array de mensajes
    this.mensaje = ''; // Limpiar el campo de entrada
  }

  // Obtener un color aleatorio para el usuario
  private getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  conectar() {
    this.chatService.conectar(); // Establece la conexion con el WebSocket
    this.chatService.getMensajesGuardados().subscribe(
      (mensajes) => {
        this.mensajes = mensajes; // Cargar mensajes previos
        console.log(
          'Mensajes cargados desde la base de datos: ',
          this.mensajes
        );
        this.conectado = true; // Cambiar el estado a conectado
      },
      (error) => {
        console.error('Error al cargar mensajes guardados: ', error);
      }
    );
  }

  desconectar() {
    this.chatService.desconectar();
    this.conectado = false; // Cambiar el estado a desconectado
  }
}
