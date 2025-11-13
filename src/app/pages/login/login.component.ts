import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  private router = inject(Router);
  private http = inject(HttpClient);
  private API_URL = environment.apiUrl;

  login() {
    this.http.post(`${this.API_URL}/login`, { correo: this.email, password: this.password })
      .subscribe({
        next: (res: any) => {
          if (res.token) {
            localStorage.setItem('auth', 'true');
            localStorage.setItem('usuario', JSON.stringify(res.user));
            localStorage.setItem('token', res.token);
            this.router.navigate(['/admin/dashboard']);
          }
        },
        error: err => {
          console.error(err);
          this.error = err.error?.error || 'Error al iniciar sesión';
        }
      });
  }
}

