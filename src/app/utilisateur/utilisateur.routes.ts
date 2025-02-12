import { Routes } from '@angular/router';

const DATA_ROUTES: Routes = [
  {
    path: 'data',
    loadComponent: () => import('./tableau/tableau.component').then(m => m.TableauComponent)
  },
  {
    path: ':mode/:id',
    loadComponent: () => import('./user-form/user-form.component').then(m => m.UserFormComponent)
  },
  {
    path: ':mode',
    loadComponent: () => import('./user-form/user-form.component').then(m => m.UserFormComponent)
  }
];

export {DATA_ROUTES};
