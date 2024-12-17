import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Reservation} from '../model/reservation.model';

interface payload {
  utilisateurId: number,
  jeuxId: number,
  reservation: number,
}

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private API_URL = 'http://localhost:8080/api';
  private API_ENTITY_NAME = 'booking';

  constructor(private http: HttpClient) {}

  getBookings(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.API_URL}/${this.API_ENTITY_NAME}`);
  }

  getBooking_id(userId: number, gameId: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.API_URL}/${this.API_ENTITY_NAME}/${userId}/${gameId}`);
  }

  addBooking(booking: payload): Observable<payload> {
    return this.http.post<payload>(`${this.API_URL}/${this.API_ENTITY_NAME}`, booking);
  }

  updateBooking(reservation: payload): Observable<Reservation> {
    const url = `${this.API_URL}/${this.API_ENTITY_NAME}/${reservation.utilisateurId}/${reservation.jeuxId}`;
    return this.http.put<Reservation>(url, reservation);
  }

  deleteBooking(utilisateurId: number, jeuId: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${this.API_ENTITY_NAME}/${utilisateurId}/${jeuId}`);
  }
}
