import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

export interface Producto {
  id_producto?: number;
  nombre: string;
  descripcion: string;
  valor: number;
  categoria: string;
  stock: number;
  imagen?: string;
}

export interface Categoria {
  categoria: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  API_URL = environment.apiUrl;
  S3_BUCKET = environment.S3_BUCKET;

  constructor(private http: HttpClient) {}

  getProductos() {
  return this.http.get<{ ok: boolean, productos: Producto[] }>(`${this.API_URL}/productos`);
}


  getCategorias() {
  return this.http.get<{ ok: boolean, categorias: Categoria[] }>(`${this.API_URL}/categorias`);
}


  deleteProducto(id: number) {
    return this.http.delete(`${this.API_URL}/productos/${id}`);
  }

  updateProducto(id: number, producto: any, file?: File) {
    if (file) {
      return this.subirImagen(file).then(url => {
        producto.imagen = url;
        return this.http.put(`${this.API_URL}/productos/${id}`, producto).toPromise();
      });
    } else {
      return this.http.put(`${this.API_URL}/productos/${id}`, producto).toPromise();
    }
  }

  async createProducto(producto: any, file?: File) {
    if (file) {
      const url = await this.subirImagen(file);
      producto.imagen = url;
    }
    return this.http.post(`${this.API_URL}/productos`, producto).toPromise();
  }

  private async subirImagen(file: File): Promise<string> {
  const presign = await this.http
    .get<{ url: string; key: string }>(
      `${this.API_URL}/s3/presigned-url?filename=${encodeURIComponent(file.name)}&filetype=${file.type}`
    )
    .toPromise();

  await fetch(presign.url, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type // ⚠️ debe coincidir con el ContentType del presigned
    },
  });

  return `https://asorisa-productos-2025.s3.amazonaws.com/${presign.key}`;
}


}
