import {Component, Input} from '@angular/core';
import {Reservation} from '../../model/booking.model';
import {ReservationService} from '../../service/booking.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {UserService} from '../../service/user.service';
import {GameService} from '../../service/game.service';
import {firstValueFrom} from 'rxjs';

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
    MatButtonModule

  ],
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent {
  mode: 'add' | 'update' = 'add'; // en add par défaut
  utilisateurId!: number;
  jeuId!: number;
  reservation!: Reservation;

  constructor(private readonly reservationService: ReservationService,
              private readonly userService: UserService,
              private readonly gameService: GameService,
              private route: ActivatedRoute,
              private readonly router: Router) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.mode = data['mode'];
      if (this.mode === 'update') {
        this.utilisateurId = Number(this.route.snapshot.paramMap.get('utilisateurId'));
        this.jeuId = Number(this.route.snapshot.paramMap.get('jeuId'));
        this.getReservation();
      }
      else {
        this.reservation = {
          reservation: 0,
          utilisateurId: 0,
          jeuxId: 0,
          game: undefined,
          user: undefined,
        }
      }
    });
  }

  getReservation() {
    this.reservationService.getBooking(this.utilisateurId, this.jeuId).subscribe(data => {
      this.reservation = data;
      this.userService.getUser(this.reservation.utilisateurId).subscribe(user => {
        this.reservation.user = user;
      });
      this.gameService.getGame(this.reservation.jeuxId).subscribe(game => {
        this.reservation.game = game;
      });
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
