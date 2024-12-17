import { Injectable } from '@angular/core';

// Singleton pour éviter l'envoie des ids utilisateurs et jeux
// à travers l'url lors de modification de réservation
@Injectable({
  providedIn: 'root'
})
export class ReservationDataService {
  private utilisateurId: number = -1;
  private jeuId: number = -1;

  // Setters
  setIds(utilisateurId: number, jeuId: number): void {
    this.utilisateurId = utilisateurId;
    this.jeuId = jeuId;
  }

  // Getters
  getUtilisateurId(): number {
    return this.utilisateurId;
  }

  getJeuId(): number {
    return this.jeuId;
  }

}
