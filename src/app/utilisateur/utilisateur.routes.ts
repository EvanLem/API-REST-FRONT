import { Routes } from '@angular/router';

const DATA_ROUTES: Routes = [
  {
    path: 'data',
    loadComponent: () => import('./tableau/tableau.component').then(m => m.TableauComponent)
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./user-form/user-form.component').then(m => m.UserFormComponent),
    data: {mode: 'update'}
  },
  {
    path: 'add',
    loadComponent: () => import('./user-form/user-form.component').then(m => m.UserFormComponent),
    data: {mode: 'add'}
  }
];

export {DATA_ROUTES};
