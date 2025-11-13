import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'; // Asegúrate de la ruta
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ContactoService {
  private API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Obtener todos los mensajes de contacto (para el panel admin)
   */
  getContactos(): Observable<any[]> {
  return this.http.get<any>(`${this.API_URL}/contacto`).pipe(
    map((res) => res.contactos || []) // devolvemos solo el array
  );
}

  /**
   * Enviar un nuevo mensaje de contacto (para el formulario público)
   */
  createContacto(datos: any): Observable<any> {
    return this.http.post(`${this.API_URL}/contacto`, datos);
  }
}
