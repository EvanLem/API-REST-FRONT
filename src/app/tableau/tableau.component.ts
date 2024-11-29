import {Component, OnInit} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {Utilisateur} from '../model/utilisateur.model';
import {UtilisateurService} from '../service/utilisateur.service';
import {UserFormComponent} from '../user-form/user-form.component';

@Component({
  selector: 'app-tableau',
  standalone: true,
  imports: [
    MatTableModule,
    UserFormComponent
  ],
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.css']
})
export class TableauComponent implements OnInit {
  users!: MatTableDataSource<Utilisateur>;
  columnsToDisplay = ['nom', 'prenom', 'mail', 'username'];

  showForm: boolean = false;
  selectedUserId: number = 0;

  constructor(
    private readonly userService: UtilisateurService,
  ) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.get_utilisateurs().subscribe(data => {
      this.users = new MatTableDataSource(data);
      });
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  rowClick(row: any) {
    this.selectedUserId = row.id;
    this.toggleForm()
  }
}
