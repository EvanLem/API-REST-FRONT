import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Game} from '../../model/game.model';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GameService} from '../../service/game.service';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-game-form',
  standalone: true,
    imports: [
      FormsModule,
      CommonModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule

    ],
  templateUrl: './game-form.component.html',
  styleUrl: './game-form.component.css'
})
export class GameFormComponent {
  mode: 'add' | 'update' = 'add';
  id!: number;
  jeu!: Game;

  constructor(private readonly gameService: GameService,
              private route: ActivatedRoute,
              private readonly router: Router) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.mode = data['mode'];
      if (this.mode === 'update') {
        this.id = Number(this.route.snapshot.paramMap.get('id'));
        this.getGame();
      }
      else {
        this.jeu = {
          id: 0,
          nom: '',
          quantite: 0,
          description: '',
          point_geo: ''
        }
      }
    });
  }

  getGame() {
    this.gameService.getGame(this.id).subscribe(data => {
      this.jeu = data;
    });
  }

  updateGame() {
    try {
      this.gameService.updateGame(this.jeu).subscribe({
        next: () => {
          alert("Mise à jour du jeu : " + this.jeu.nom);
          this.router.navigate(['/game/data']);
        }
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout de le réservation", error);
    }
  }

  addGame(): void {
    try {
      this.gameService.addGame(this.jeu).subscribe({
        next: () => {
          alert("Suppression de la réservation");
          this.router.navigate(['/game/data']);
        }
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout de le réservation", error);
    }
  }

  supprimerJeu() {
    try {
      this.gameService.deleteGame(this.jeu.id).subscribe({
        next: () => {
          alert("Suppression de la réservation");
          this.router.navigate(['/game/data']);
        }
      });
    } catch (error) {
      console.error("Erreur lors de la supression de le réservation", error);
    }
  }

  onSubmit() {
    if (this.mode === 'update') {
      this.updateGame();
    } else {
      this.addGame();
    }
  }

}
