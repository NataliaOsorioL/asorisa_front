import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private API_URL = 'https://fizis1pgyi.execute-api.us-east-1.amazonaws.com';
  private usuario: any = null;
  private router = inject(Router);
  private http = inject(HttpClient);

  login(correo: string, contrasena: string): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, { correo, password: contrasena }).pipe(
      tap((res: any) => {
        if (res.token) {
          this.usuario = res.user;
          localStorage.setItem('usuario', JSON.stringify(this.usuario));
          localStorage.setItem('token', res.token);
          this.router.navigate(['/admin']);
        }
      })
    );
  }

  logout() {
    this.usuario = null;
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getUsuario() {
    if (!this.usuario) {
      const saved = localStorage.getItem('usuario');
      if (saved) this.usuario = JSON.parse(saved);
    }
    return this.usuario;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAdmin(): boolean {
    const u = this.getUsuario();
    return u && u.rol === 'admin';
  }
}
