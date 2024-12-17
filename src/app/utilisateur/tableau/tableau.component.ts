import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Utilisateur } from '../../model/utilisateur.model';
import { UtilisateurService } from '../../service/utilisateur.service';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-tableau',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterLink, MatPaginatorModule],
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TableauComponent implements OnInit {
  users: Utilisateur[] = [];
  filteredUsers: Utilisateur[] = [];
  paginatedUsers: Utilisateur[] = [];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20];
  pageIndex = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private readonly userService: UtilisateurService, private router: Router) {}

  ngOnInit() {
    this.fetchUsers();
    console.log(this.pageIndex, this.pageSize, this.paginatedUsers);
  }

  fetchUsers() {
    this.userService.get_utilisateurs().subscribe(data => {
      this.users = data;
      this.filteredUsers = data;
      this.updatePaginatedUsers();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      user.nom.toLowerCase().includes(filterValue) ||
      user.prenom.toLowerCase().includes(filterValue) ||
      user.mail.toLowerCase().includes(filterValue) ||
      user.username.toLowerCase().includes(filterValue) ||
      user.password.toLowerCase().includes(filterValue)
    );
    this.updatePaginatedUsers();
  }

  updatePaginatedUsers() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedUsers = this.filteredUsers.slice(startIndex, endIndex);
  }

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updatePaginatedUsers();
  }

  sortData(column: keyof Utilisateur) {
    const sorted = [...this.filteredUsers].sort((a, b) => {
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
    this.filteredUsers = sorted;
    this.updatePaginatedUsers();
  }

  navigateToEdit(id: number) {
    this.router.navigate([`/utilisateur/update/${id}`]);
  }
}
