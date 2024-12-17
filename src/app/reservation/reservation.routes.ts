import { Routes } from '@angular/router';

const DATA_ROUTES: Routes = [
  {
    path: 'data',
    loadComponent: () => import('./reservation-tableau/reservation-tableau.component').then(m => m.ReservationTableauComponent)
  },
  {
    path: 'edit',
    loadComponent: () => import('./reservation-form/reservation-form.component').then(m => m.ReservationFormComponent),
    data: {mode: 'update'}
  },
  {
    path: 'add',
    loadComponent: () => import('./reservation-form/reservation-form.component').then(m => m.ReservationFormComponent),
    data: {mode: 'add'}
  },
];

export {DATA_ROUTES};
