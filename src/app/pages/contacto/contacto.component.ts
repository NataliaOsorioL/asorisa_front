import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from "@angular/forms";
import { ContactoService } from "../../services/contacto.service";

@Component({
  selector: "app-contacto",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: "./contacto.component.html",
  styleUrls: ["./contacto.component.css"],
})
export class ContactoComponent {
  contactoForm: FormGroup;
  enviado = false;
  mensajeExito = "";

  constructor(
    private fb: FormBuilder,
    private contactoService: ContactoService
  ) {
    this.contactoForm = this.fb.group({
      nombre: ["", [Validators.required, Validators.minLength(2)]],
      email: ["", [Validators.required, Validators.email]],
      asunto: ["", [Validators.required, Validators.minLength(3)]],
      mensaje: ["", [Validators.required, Validators.minLength(5)]],
    });
  }

  enviarFormulario() {
    if (this.contactoForm.invalid) {
      this.contactoForm.markAllAsTouched();
      return;
    }

    const datos = this.contactoForm.value;

    this.contactoService.createContacto(datos).subscribe({
      next: () => {
        this.enviado = true;
        this.mensajeExito = "✅ Tu mensaje se ha enviado correctamente.";
        this.contactoForm.reset();
      },
      error: (err) => {
        console.error("❌ Error al enviar mensaje:", err);
        alert("Hubo un error al enviar tu mensaje. Intenta nuevamente.");
      },
    });
  }
}
