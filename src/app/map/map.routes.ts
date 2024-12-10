import { Routes } from '@angular/router';

export const DATA_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./map.component').then(m => m.MapComponent),
  }

];
