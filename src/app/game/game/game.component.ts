import {Component, ViewEncapsulation} from '@angular/core';
import { GameService } from '../../service/game.service';
import { Game } from '../../model/game.model'
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
  encapsulation: ViewEncapsulation.None
})
export class GameComponent {

  jeux: Game[] = [];
  filteredJeux: Game[] = [];

  constructor(private readonly jeuxService: GameService, private router: Router) {}

  ngOnInit() {
    this.fetchJeux();
  }

  fetchJeux() {
    this.jeuxService.getGames().subscribe(data => {
      this.jeux = data;
      this.filteredJeux = data;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredJeux = this.jeux.filter(user =>
      user.nom.toLowerCase().includes(filterValue) ||
      user.quantite.valueOf() ||
      user.description.toLowerCase().includes(filterValue) ||
      user.point_geo.toLowerCase().includes(filterValue)
    );
  }

  sortData(column: keyof Game) {
    const sorted = [...this.filteredJeux].sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        return aValue - bValue;
      } else {
        return 0;
      }
    });
    this.filteredJeux = sorted;
  }

  navigateToEdit(id: number) {
    this.router.navigate([`/game/edit/${id}`]);
  }

}
