import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ContactoService } from 'src/app/services/contacto.service';


@Component({
  selector: 'app-contacto-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contacto-admin.component.html',
  styleUrls: ['./contacto-admin.component.css']
})
export class ContactoAdminComponent implements OnInit {
  contactos: any[] = [];
  loading = true;
  error = '';

  constructor(private contactoService: ContactoService) {}

  ngOnInit() {
  this.contactoService.getContactos().subscribe({
    next: (data) => {
      console.log(data); // ya es un array
      this.contactos = data.sort((a, b) => b.fecha.localeCompare(a.fecha));
      this.loading = false;
    },
    error: (err) => {
      console.error('Error cargando contactos', err);
      this.error = 'No se pudieron cargar los mensajes.';
      this.loading = false;
    },
  });
}


}
