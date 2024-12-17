import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Game} from '../model/game.model';
import {Observable} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private API_URL = 'http://localhost:8080/api';
  API_ENTITY_NAME = "game";

  constructor(private http: HttpClient) {}

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.API_URL}/${this.API_ENTITY_NAME}`);
  }

  getGame(id: number): Observable<Game> {
    return this.http.get<Game>(`${this.API_URL}/${this.API_ENTITY_NAME}/${id}`);
  }

  addGame(game: Game): Observable<Game> {
    return this.http.post<Game>(`${this.API_URL}/${this.API_ENTITY_NAME}`, game);
  }

  updateGame(game: Game): Observable<Game> {
    const url = `${this.API_URL}/${this.API_ENTITY_NAME}/${game.id}`;
    return this.http.put<Game>(url, game);
  }

  deleteGame(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${this.API_ENTITY_NAME}/${id}`);
  }


}
