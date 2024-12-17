import {User} from './user.model';
import {Game} from './game.model';

export interface Reservation {
  reservation: number;
  utilisateurId: number;
  jeuxId: number;
  user?: User; // Champs pour stocker les détails de l'utilisateur
  game?: Game; // Champs pour stocker les détails du jeu
}
