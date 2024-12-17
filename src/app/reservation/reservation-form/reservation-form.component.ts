import {Component} from '@angular/core';
import {Reservation} from '../../model/reservation.model';
import {ReservationService} from '../../service/reservation.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {UtilisateurService} from '../../service/utilisateur.service';
import {JeuxService} from '../../service/jeux.service';
import { Utilisateur } from '../../model/utilisateur.model';
import { Jeux } from '../../model/jeux.model';
import {ReservationDataService} from '../../service/reservationData';
import {MatOption, MatSelect} from '@angular/material/select';
import {forkJoin} from 'rxjs';

interface playload {
  utilisateurId: number,
  jeuxId: number,
  reservation: number,
}

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelect,
    MatOption
  ],
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent {
  mode: 'add' | 'update' = 'add'; // en add par défaut
  utilisateurId!: number;
  jeuId!: number;
  users!: Utilisateur[];
  jeux!: Jeux[];
  reservation!: Reservation;

  constructor(private readonly reservationService: ReservationService,
              private readonly userService: UtilisateurService,
              private readonly gameService: JeuxService,
              private reservationDataService: ReservationDataService,
              private route: ActivatedRoute,
              private readonly router: Router) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.mode = data['mode'];
      if (this.mode === 'update') {
        // Récupérer les données via une redirection statique
        this.utilisateurId = this.reservationDataService.getUtilisateurId();
        this.jeuId = this.reservationDataService.getJeuId();
        // Redirige si aucune donnée n'est présente
        if (!this.jeuId || !this.utilisateurId) {
          this.router.navigate(['/reservation/data']);
        }
        this.getReservation();
      }
      else {
        this.reservation = {
          reservation: 0,
          utilisateurId: 0,
          jeuxId: 0,
          jeux: undefined,
          utilisateur: undefined,
        }
        // On récupère les utilisateurs et les jeux pour la sélection dans le formulaire pour ajout
        this.fetchData()
      }
    });
  }

  // Pour update
  getReservation() {
    this.reservationService.getBooking_id(this.utilisateurId, this.jeuId).subscribe(data => {
      this.reservation = data;
      this.userService.get_utilisateurs_id(this.reservation.utilisateurId).subscribe(user => {
        this.reservation.utilisateur = user;
      });
      this.gameService.get_jeux_id(this.reservation.jeuxId).subscribe(game => {
        this.reservation.jeux = game;
      });
    });
  }

  // Pour ajouter
  fetchData() {
    forkJoin({
      users: this.userService.get_utilisateurs(),
      games: this.gameService.get_jeux()
    }).subscribe({
      next: (data) => {
        this.users = data.users;
        this.jeux = data.games;
        console.log("TEST", this.users, this.jeux);
      },
      error: (error) => {
        console.error("Erreur lors du chargement des données :", error);
      }
    });
  }

  updateReservation() {
    const payload: playload = {
      utilisateurId: this.reservation.utilisateurId,
      jeuxId: this.reservation.jeuxId,
      reservation: this.reservation.reservation,
    };
    try {
      this.reservationService.updateBooking(payload).subscribe({
        next: () => {
          alert("Mis à jour de la réservation");
          // Redirection après update
          this.router.navigate(['/reservation/data']);
        }
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout de le réservation", error);
    }
  }

  async addReservation() {
    const payload: playload = {
      utilisateurId: this.reservation.utilisateurId,
      jeuxId: this.reservation.jeuxId,
      reservation: this.reservation.reservation,
    };
    try {
      this.reservationService.addBooking(payload).subscribe({
        next: () => {
          alert("Ajout de la réservation");
          // Redirection après update
          this.router.navigate(['/reservation/data']);
        }
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout de le réservation", error);
    }
  }

  supprimerReservation() {
    try {
      this.reservationService.deleteBooking(this.reservation.utilisateurId, this.reservation.jeuxId).subscribe({
        next: () => {
          alert("Suppression de la réservation");
          this.router.navigate(['/reservation/data']);
        }
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout de le réservation", error);
    }
  }

  async onSubmit() {
    if (this.mode === 'update') this.updateReservation();
    else this.addReservation();
  }

}
