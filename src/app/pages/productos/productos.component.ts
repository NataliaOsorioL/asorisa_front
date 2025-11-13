import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Producto } from '../../services/productos.services';
import { ProductDetailComponent } from '../detalles/detalles.component';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, ProductDetailComponent],
  templateUrl: './productos.component.html',
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  productoSeleccionado: Producto | null = null;
  cargando = false;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.cargando = true;
    this.productService.getProductos().subscribe({
      next: (res) => {
        // Verifica que la respuesta tenga la propiedad productos
        this.productos = res.productos || [];
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
        this.cargando = false;
      }
    });
  }

  abrirDetalle(producto: Producto) {
    this.productoSeleccionado = producto;
  }

  cerrarDetalle() {
    this.productoSeleccionado = null;
  }
}
