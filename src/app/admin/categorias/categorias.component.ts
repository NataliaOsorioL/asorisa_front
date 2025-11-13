import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  Categoria,
  CategoriaService,
} from "src/app/services/categorias.service";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-categorias",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./categorias.component.html",
})
export class CategoriasAdminComponent {
  categorias: Categoria[] = [];
  modalAbierto = false;
  nuevaCategoria = "";

  private categoriaService = inject(CategoriaService);

  ngOnInit() {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.categoriaService.getCategorias().subscribe((data: any) => {
      this.categorias = data.categorias;
    });
  }

  abrirModal() {
    this.modalAbierto = true;
    this.nuevaCategoria = "";
  }

  cerrarModal() {
    this.modalAbierto = false;
  }

  guardarCategoria() {
    if (!this.nuevaCategoria.trim()) return;

    this.categoriaService
      .createCategoria({ categoria: this.nuevaCategoria })
      .subscribe(() => {
        this.cargarCategorias();
        this.cerrarModal();
      });
  }

  eliminarCategoria(cat: Categoria) {
    if (!cat.id_categoria) return;

    this.categoriaService
      .deleteCategoria(cat.id_categoria)
      .subscribe(() => this.cargarCategorias());
  }
}
