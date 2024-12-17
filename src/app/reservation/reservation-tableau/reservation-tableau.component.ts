import {Component, ViewEncapsulation} from '@angular/core';
import {Reservation} from '../../model/reservation.model';
import {ReservationService} from '../../service/reservation.service';
import {Router, RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {UtilisateurService} from '../../service/utilisateur.service';
import {JeuxService} from '../../service/jeux.service';
import {MatFormField} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {Utilisateur} from '../../model/utilisateur.model';
import {ReservationDataService} from '../../service/reservationData';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-reservation-tableau',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, RouterLink],
  templateUrl: './reservation-tableau.component.html',
  styleUrl: './reservation-tableau.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ReservationTableauComponent {
  reservation: Reservation[] = [];
  filteredReservations: Reservation[] = [];
  users: Utilisateur[] = []; // Liste des utilisateurs
  selectedUserId: number = -1; // Utilisateur sélectionné

  constructor(private readonly reservationService: ReservationService,
              private readonly userService: UtilisateurService,
              private readonly gameService: JeuxService,
              private reservationDataService: ReservationDataService,
              private router: Router) {}

  ngOnInit() {
    this.fetchReservations();
  }

  fetchReservations() {
    this.reservationService.getBookings().subscribe(data => {
      this.reservation = data;
      this.filteredReservations = data;

      this.reservation.forEach(res => {
        this.userService.get_utilisateurs_id(res.utilisateurId).subscribe(user => {
          res.utilisateur = user;
          if (!this.users.find(u => u.id === user.id)) {
            this.users.push(user); // Ajouter l'utilisateur unique
          }
        });

        this.gameService.get_jeux_id(res.jeuxId).subscribe(game => {
          res.jeux = game;
        });
      });
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredReservations = this.reservation.filter(reservation =>
      reservation.reservation.toString().toLowerCase().includes(filterValue) ||
      reservation.utilisateur?.nom.toLowerCase().includes(filterValue) ||
      reservation.utilisateur?.prenom.toLowerCase().includes(filterValue) ||
      reservation.utilisateur?.username.toLowerCase().includes(filterValue) ||
      reservation.jeux?.nom.toLowerCase().includes(filterValue)
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
    // Stocker les IDs dans le service
    this.reservationDataService.setIds(utilisateurId, jeuId);

    // Naviguer vers la route statique
    this.router.navigate(['/reservation/edit']);
  }

}
