import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Jeux} from '../../model/jeux.model';
import {FormsModule } from "@angular/forms";
import {JeuxService} from '../../service/jeux.service';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-aire-de-jeu-form',
  standalone: true,
    imports: [
      FormsModule,
      CommonModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule
    ],
  templateUrl: './aire-de-jeu-form.component.html',
  styleUrl: './aire-de-jeu-form.component.css'
})
export class AireDeJeuFormComponent {
  @Input() mode: 'add' | 'update' = 'add';
  id!: number;
  jeu!: Jeux;

  constructor(private readonly gameService: JeuxService,
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
    this.gameService.get_jeux_id(this.id).subscribe(data => {
      this.jeu = data;
    });
  }

  updateGame() {
    try {
      this.gameService.update_jeu(this.jeu).subscribe({
        next: () => {
          alert("Mise à jour du jeu : " + this.jeu.nom);
          this.router.navigate(['/aire-de-jeu/data']);
        }
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'aire de jeu", error);
    }
  }

  addGame(): void {
    try {
      this.gameService.create_jeu(this.jeu).subscribe({
        next: () => {
          alert("Suppression de l'aire de jeu");
          this.router.navigate(['/aire-de-jeu/data']);
        }
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'aire de jeu", error);
    }
  }

  supprimerJeu() {
    try {
      this.gameService.delete_jeu(this.jeu.id).subscribe({
        next: () => {
          alert("Suppression de l'aire de jeu");
          this.router.navigate(['/aire-de-jeu/data']);
        }
      });
    } catch (error) {
      console.error("Erreur lors de la suppression de l'aire de jeu", error);
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
