import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.userService.getUsers().subscribe(
      (users: User[]) => {
        const user = users.find(
          u => u.name === this.username && u.password === this.password
        );
  
        if (user) {
          // Usuario y contraseña correctos: almacenar información en localStorage
          localStorage.setItem('loggedUser', JSON.stringify(user));
          this.router.navigate(['/dashboard']);
        } else {
          // Usuario o contraseña incorrectos: mostrar alerta
          window.alert('Usuario o contraseña incorrectos');
        }
      },
      (error) => {
        // Manejo de errores en la llamada a la API
        window.alert('Error de conexión. Inténtelo de nuevo.');
        console.error(error);
      }
    );
  }
  

}
