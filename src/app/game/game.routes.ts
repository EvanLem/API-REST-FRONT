import { Routes } from '@angular/router';

const DATA_ROUTES: Routes = [
  {
    path: 'data',
    loadComponent: () => import('./game/game.component').then(m => m.GameComponent)
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./game-form/game-form.component').then(m => m.GameFormComponent),
    data: {mode: 'update'}
  },
  {
    path: 'add',
    loadComponent: () => import('./game-form/game-form.component').then(m => m.GameFormComponent),
    data: {mode: 'add'}
  }

];

export {DATA_ROUTES};
