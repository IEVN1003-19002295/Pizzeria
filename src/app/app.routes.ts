import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pizzeria',
    pathMatch: 'full',
  },
  {
    path: 'pizzeria',
    loadComponent: () =>
      import('./proyecto/pizzeria/pizzeria.component').then(
        (m) => m.PizzeriaComponent
      ),
  },
];
