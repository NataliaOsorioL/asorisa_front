import { Component, OnInit } from '@angular/core';
import { ProductService, Producto, Categoria } from '../../services/productos.services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.component.html'
})
export class ProductosAdminComponent implements OnInit {
  productos: Producto[] = [];
  categorias: Categoria[] = [];
  modalAbierto = false;
  productoSeleccionado?: Producto;
  form: any = {};
  fileSelected?: File;
  previewUrl?: string; // <-- URL de previsualización

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.cargarCategorias();
    this.cargarProductos();
  }

  cargarCategorias() {
    this.productService.getCategorias().subscribe(res => {
      this.categorias = res.categorias;
      console.log(this.categorias);
    });
  }

  cargarProductos() {
    this.productService.getProductos().subscribe(resp => {
      this.productos = resp.productos;
    });
  }

  abrirModal(producto?: Producto) {
    console.log("abriendo modal");
    this.modalAbierto = true;

    if (producto) {
      this.productoSeleccionado = producto;
      this.form = { ...producto };
      this.previewUrl = producto.imagen || undefined; // <-- previsualización existente
    } else {
      this.productoSeleccionado = undefined;
      this.form = {};
      this.fileSelected = undefined;
      this.previewUrl = undefined;
    }
  }

  cerrarModal() {
    this.modalAbierto = false;
    this.form = {};
    this.fileSelected = undefined;
    this.productoSeleccionado = undefined;
    this.previewUrl = undefined;
  }

  onFileSelected(event: any) {
    this.fileSelected = event.target.files[0];
    if (this.fileSelected) {
      this.previewUrl = URL.createObjectURL(this.fileSelected); // <-- crear preview solo si hay archivo
    }
  }

  async guardarProducto() {
    try {
      if (this.productoSeleccionado) {
        await this.productService.updateProducto(this.productoSeleccionado.id_producto, this.form, this.fileSelected);
      } else {
        await this.productService.createProducto(this.form, this.fileSelected!);
      }
      this.cargarProductos();
      this.cerrarModal();
    } catch (error) {
      console.error('Error al guardar producto:', error);
      alert('Error al guardar producto');
    }
  }

  editarProducto(producto: Producto) {
    this.abrirModal(producto);
  }

  eliminarProducto(producto: Producto) {
    if (confirm(`Eliminar ${producto.nombre}?`)) {
      this.productService.deleteProducto(producto.id_producto)
        .subscribe(() => this.cargarProductos());
    }
  }
}
