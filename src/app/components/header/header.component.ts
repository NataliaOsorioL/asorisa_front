import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from 'src/app/services/carrito.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormsModule } from '@angular/forms';
import { take } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  cartOpen = false;
  userMenuOpen = false;
  finalizando = false; // ← indica si se está en el paso de confirmación
  nombreComprador = ''; // ← nombre del usuario
  mobileMenuOpen = false;

  cartCount$ = this.cartService.cartCount$;
  cartItems$ = this.cartService.cartItems$;
  cartTotal$ = this.cartService.cartTotal$;

  constructor(
    public cartService: CartService,
    public authService: AuthService
  ) {}

  toggleCart() {
    this.cartOpen = !this.cartOpen;
    this.userMenuOpen = false;
    this.finalizando = false;
  }

  toggleUserMenu() {
    this.userMenuOpen = !this.userMenuOpen;
    this.cartOpen = false;
  }

  nombre(){
    console.log("entre aqui");
    
    this.finalizando = true;
  }
  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
  confirmarCompra() {
  if (!this.nombreComprador.trim()) {
    alert('Por favor, escribe tu nombre antes de continuar.');
    return;
  }
  
  this.cartItems$.pipe(take(1)).subscribe(items => {
    if (items.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }

    // Obtener el valor total actual
    this.cartTotal$.pipe(take(1)).subscribe(total => {
      const carrito = {
        comprador: this.nombreComprador,
        productos: items.map(i => ({
          nombre: i.producto.nombre,
          unidades: i.cantidad,
          precioUnitario: i.producto.valor,
        })),
        total: total // valor primitivo, no Observable
      };

      this.cartService.finalizarCompra(carrito).subscribe({
        next: () => {
          alert('✅ Compra finalizada correctamente');
          this.cartService.clearCart();
          this.cartOpen = false;
          this.finalizando = false;
          this.nombreComprador = '';
        },
        error: (err) => {
          console.error('Error al finalizar compra:', err);
          alert('❌ Hubo un error al procesar tu compra.');
        }
      });
    });
  });
}
}
