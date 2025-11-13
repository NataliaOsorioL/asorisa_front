import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/admin-guard';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { ProductosAdminComponent } from './admin/productos/productos.component';
import { CategoriasAdminComponent } from './admin/categorias/categorias.component';
import { VentasComponent } from './admin/ventas/ventas.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { ContactoAdminComponent } from './admin/contacto-admin/contacto-admin.component';



export const routes: Routes = [
  {
    path: '',
    component: InicioComponent,
  },
  {
    path: 'productos',
    component: ProductosComponent,
  },
  {
    path: 'contacto',
    component: ContactoComponent,
  },
  {
    path: 'nosotros',
    component: NosotrosComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
   {
    path: 'admin',
    component: AdminDashboardComponent,
    children: [
      { path: '', redirectTo: 'ventas', pathMatch: 'full' },
      { path: 'productos', component: ProductosAdminComponent },
      { path: 'categorias', component: CategoriasAdminComponent },
      { path: 'ventas', component: VentasComponent },
      { path: 'contacto', component: ContactoAdminComponent },
    ],
  },

  // Redirección por defecto
  { path: '**', redirectTo: '' },

];
