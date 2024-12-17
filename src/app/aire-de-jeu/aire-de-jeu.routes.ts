import { Routes } from '@angular/router';

const DATA_ROUTES: Routes = [
  {
    path: 'data',
    loadComponent: () => import('./aire-de-jeu/aire-de-jeu.component').then(m => m.AireDeJeuComponent)
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./aire-de-jeu-form/aire-de-jeu-form.component').then(m => m.AireDeJeuFormComponent),
    data: {mode: 'update'}
  },
  {
    path: 'add',
    loadComponent: () => import('./aire-de-jeu-form/aire-de-jeu-form.component').then(m => m.AireDeJeuFormComponent),
    data: {mode: 'add'}
  }

];

export {DATA_ROUTES};
