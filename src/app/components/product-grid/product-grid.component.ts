import { Component } from '@angular/core';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss']
})
export class ProductGridComponent {
  products = [
    { name: 'Audífonos Bluetooth', price: '120000', image: 'assets/products/headphones.jpg' },
    { name: 'Mouse Inalámbrico', price: '80000', image: 'assets/products/mouse.jpg' },
    { name: 'Teclado Mecánico', price: '200000', image: 'assets/products/keyboard.jpg' },
    { name: 'Router WiFi 6', price: '350000', image: 'assets/products/router.jpg' }
  ];
}
