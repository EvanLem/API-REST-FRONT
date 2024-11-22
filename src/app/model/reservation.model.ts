import { Utilisateur } from './utilisateur.model';
import { Jeux } from './jeux.model';

export interface Reservation {
  utilisateurId: number;
  jeuxId: number;
  utilisateur: Utilisateur;
  jeux: Jeux;
  reservation: number;
}
