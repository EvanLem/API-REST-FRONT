import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'game',
    loadChildren: () => import('./game/game.routes').then(m => m.DATA_ROUTES)

  },
  {
    path: 'reservation',
    loadChildren: () => import('./reservation/reservation.routes').then(m => m.DATA_ROUTES)

  }
];
