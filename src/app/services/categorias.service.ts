import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface Categoria {
  id_categoria?: number;
  categoria: string;
}

@Injectable({ providedIn: 'root' })
export class CategoriaService {
  private API_URL = environment.apiUrl;
  private http = inject(HttpClient);

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.API_URL}/categorias`);
  }

  getCategoria(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.API_URL}/categorias/${id}`);
  }

  createCategoria(data: Categoria): Observable<any> {
    return this.http.post(`${this.API_URL}/categorias`, data);
  }

  updateCategoria(id: number, data: Categoria): Observable<any> {
    return this.http.put(`${this.API_URL}/categorias/${id}`, data);
  }

  deleteCategoria(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/categorias/${id}`);
  }
}
