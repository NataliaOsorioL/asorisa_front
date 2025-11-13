import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  ventas: any[] = [];
  cargando = true;

  constructor(private ventasService: CartService) {}

  ngOnInit() {
    this.obtenerVentas();
  }

  obtenerVentas() {
  this.ventasService.getCarritos().subscribe({
    next: (data) => {
      console.log('✅ Ventas recibidas:', data);

      // Si el backend devuelve { ok, carritos }
      if (data && 'carritos' in data) {
        this.ventas = data.carritos || [];
      }
      // Si devuelve directamente un array
      else if (Array.isArray(data)) {
        this.ventas = data;
      }
      // Si no devuelve nada válido
      else {
        this.ventas = [];
      }

      this.cargando = false;
    },
    error: (err) => {
      console.error('❌ Error al cargar ventas:', err);
      this.cargando = false;
    }
  });
}

}
