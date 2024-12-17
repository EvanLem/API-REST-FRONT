import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'aire-de-jeu',
    loadChildren: () => import('./aire-de-jeu/aire-de-jeu.routes').then(m => m.DATA_ROUTES)
  },
  {
    path: 'utilisateur',
    loadChildren: () => import('./utilisateur/utilisateur.routes').then(m => m.DATA_ROUTES)
  },
  {
    path: 'map',
    loadChildren: () => import('./map/map.routes').then(m => m.DATA_ROUTES)
  },
  {
    path:'reservation',
    loadChildren:() => import('./reservation/reservation.routes').then(m => m.DATA_ROUTES)
  }
];
