import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

export interface Product {
  id_producto: number;
  nombre: string;
  descripcion: string;
  valor: number;
  imagen: string;
  stock: number;
}

export interface CartItem {
  producto: Product;
  cantidad: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private API_URL = environment.apiUrl;

  private cartItems: CartItem[] = [];
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  private cartCountSubject = new BehaviorSubject<number>(0);
  private cartTotalSubject = new BehaviorSubject<number>(0);

  cartItems$ = this.cartItemsSubject.asObservable();
  cartCount$ = this.cartCountSubject.asObservable();
  cartTotal$ = this.cartTotalSubject.asObservable();

  constructor(private http: HttpClient) {}

  //agregar al carro
addToCart(producto: Product, cantidad: number = 1) {
  const existing = this.cartItems.find(item => item.producto.id_producto === producto.id_producto);

  if (existing) {
    const nuevaCantidad = existing.cantidad + cantidad;
    existing.cantidad = Math.min(nuevaCantidad, producto.stock);
  } else {
    this.cartItems.push({ producto: { ...producto }, cantidad });
  }
  console.log(this.cartItems);
  
  this.updateState();
}



  // eliminar del carro
  removeFromCart(id: number) {
    this.cartItems = this.cartItems.filter(item => item.producto.id_producto !== id);
    this.updateState();
  }

  // vaciar carro
  clearCart() {
    this.cartItems = [];
    this.updateState();
  }

  // actualizar estado reactivo del carro
  private updateState() {
    const total = this.cartItems.reduce(
      (acc, item) => acc + item.cantidad * item.producto.valor,
      0
    );
    const count = this.cartItems.reduce((acc, item) => acc + item.cantidad, 0);

    this.cartTotalSubject.next(total);
    this.cartCountSubject.next(count);
    this.cartItemsSubject.next([...this.cartItems]);
  }

  // enviar carro al backend (finalizar compra)
  finalizarCompra(carrito: any) {
    return this.http.post(`${this.API_URL}/carrito`, carrito);
  }

  // obtener todos los carros (ventas)
  getCarritos() {
    return this.http.get<{ ok: boolean; carritos: any[] }>(`${this.API_URL}/carrito`);
  }
}
