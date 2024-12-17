import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {ToastrService} from 'ngx-toastr';
import {catchError, Observable} from 'rxjs';
import {Utilisateur} from '../model/utilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  API_URL = 'http://localhost:8080/api';
  API_ENTITY_NAME = "user";

  constructor(private readonly http: HttpClient, private readonly toastrService: ToastrService) { }

  create_utilisateur(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(`${this.API_URL}/${this.API_ENTITY_NAME}`, utilisateur);
  }

  get_utilisateurs(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.API_URL}/${this.API_ENTITY_NAME}`);
  }

  get_utilisateurs_id(id: number): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.API_URL}/${this.API_ENTITY_NAME}/${id}`);
  }

  update_utilisateur(utilisateur: Utilisateur): Observable<Utilisateur> {
    const url = `${this.API_URL}/${this.API_ENTITY_NAME}/${utilisateur.id}`;
    return this.http.put<Utilisateur>(url, utilisateur);
  }


  delete_utilisateur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${this.API_ENTITY_NAME}/${id}`);
  }
}
