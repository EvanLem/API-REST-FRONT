import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {ToastrService} from 'ngx-toastr';
import {catchError, Observable} from 'rxjs';
import {Jeux} from '../model/jeux.model';

@Injectable({
  providedIn: 'root'
})
export class JeuxService {

  API_URL = 'http://localhost:8080/api';
  API_ENTITY_NAME = "game";

  constructor(private readonly http: HttpClient, private readonly toastrService: ToastrService) { }

  create_jeu(jeux: Jeux): Observable<Jeux> {
    return this.http.post<Jeux>(`${this.API_URL}/${this.API_ENTITY_NAME}`, jeux);
  }

  get_jeux(): Observable<Jeux[]> {
    return this.http.get<Jeux[]>(`${this.API_URL}/${this.API_ENTITY_NAME}`);
  }

  get_jeu(id: number): Observable<Jeux> {
    return this.http.get<Jeux>(`${this.API_URL}/${this.API_ENTITY_NAME}/${id}`);
  }

  update_jeu(jeux: Jeux): Observable<Jeux> {
    return this.http.put<Jeux>(`${this.API_URL}/${this.API_ENTITY_NAME}/${jeux.id}`, jeux);
  }

  delete_jeu(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${this.API_ENTITY_NAME}/${id}`);
  }
}
