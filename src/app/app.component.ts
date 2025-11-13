import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <div class="min-h-screen flex flex-col bg-black text-white">
      <app-header></app-header>
      <main class="flex-1 p-6 md:p-10">
        <router-outlet></router-outlet>
      </main>
      <footer class="py-6 text-center text-sm text-gray-500">
        © ASORISA 2025
      </footer>
    </div>
  `
})
export class AppComponent {}


