import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { Product } from '../../services/productos.services';
import { CartService } from '../../services/carrito.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detalles.component.html',
})
export class ProductDetailComponent {
  @Input() producto!: any;
  @Output() cerrar = new EventEmitter<void>();
  cantidad = 1;

  constructor(private cartService: CartService) {}

  agregarAlCarrito() {
    console.log(this.producto);
    
    this.cartService.addToCart(this.producto, this.cantidad);
    this.cerrar.emit(); // cerrar modal
  }
}

