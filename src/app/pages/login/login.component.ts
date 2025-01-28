import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username: string = ''; // NickName

  constructor(private router: Router) {}
  login() {
    if (this.username.trim()) {
      console.log('nombre en el localstorage: ', this.username);
      // Guarda el nombre de usuario en el localStorage
      localStorage.setItem('username', this.username);
      // Redirige al componente de chat
      this.router.navigate(['/chat']);
    }
  }
}
