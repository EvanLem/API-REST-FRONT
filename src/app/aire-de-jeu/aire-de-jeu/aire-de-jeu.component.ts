import {Component, ViewEncapsulation} from '@angular/core';
import { JeuxService } from '../../service/jeux.service';
import { Jeux } from '../../model/jeux.model'
import {Router, RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-aire-de-jeu',
  standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        RouterLink
    ],
  templateUrl: './aire-de-jeu.component.html',
  styleUrl: './aire-de-jeu.component.css',
  encapsulation: ViewEncapsulation.None
})
export class AireDeJeuComponent {

  jeux: Jeux[] = [];
  filteredJeux: Jeux[] = [];

  constructor(private readonly jeuxService: JeuxService, private router: Router) {}

  ngOnInit() {
    this.fetchJeux();
  }

  fetchJeux() {
    this.jeuxService.get_jeux().subscribe(data => {
      this.jeux = data;
      this.filteredJeux = data;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredJeux = this.jeux.filter(jeu =>
      jeu.nom.toLowerCase().includes(filterValue) ||
      jeu.quantite.toString().includes(filterValue) ||
      jeu.description.toLowerCase().includes(filterValue) ||
      jeu.point_geo.toLowerCase().includes(filterValue)
    );
  }

  sortData(column: keyof Jeux) {
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
    this.router.navigate([`/aire-de-jeu/edit/${id}`]);
  }

}
