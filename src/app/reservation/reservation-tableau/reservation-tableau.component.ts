import {Component, ViewEncapsulation} from '@angular/core';
import {Reservation} from '../../model/booking.model';
import {ReservationService} from '../../service/booking.service';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {UserService} from '../../service/user.service';
import {GameService} from '../../service/game.service';

@Component({
  selector: 'app-reservation-tableau',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservation-tableau.component.html',
  styleUrl: './reservation-tableau.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ReservationTableauComponent {
  reservation: Reservation[] = [];
  filteredReservations: Reservation[] = [];

  constructor(private readonly reservationService: ReservationService,
              private readonly userService: UserService,
              private readonly gameService: GameService,
              private router: Router) {}

  ngOnInit() {
    this.fetchReservations();
  }

  fetchReservations() {
    this.reservationService.getBookings().subscribe(data => {
      this.reservation = data;
      this.filteredReservations = data;

      // Enrichir chaque réservation avec les détails utilisateur et jeu
      this.reservation.forEach(res => {
        this.userService.getUser(res.utilisateurId).subscribe(user => {
          res.user = user;
        });

        this.gameService.getGame(res.jeuxId).subscribe(game => {
          res.game = game;
        });
      });
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredReservations = this.reservation.filter(reservation =>
      reservation.reservation ||
      reservation.utilisateurId ||
      reservation.jeuxId
    );
  }

  sortData(column: keyof Reservation) {
    const sorted = [...this.filteredReservations].sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return aValue - bValue;
      } else {
        return 0;
      }
    });
    this.filteredReservations = sorted;
  }


  navigateToEdit(utilisateurId: number, jeuId: number) {
    this.router.navigate([`/reservation/edit/${utilisateurId}/${jeuId}`]);
  }

}
