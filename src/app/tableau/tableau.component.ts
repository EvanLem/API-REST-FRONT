import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {Utilisateur} from '../model/utilisateur.model';
import {UtilisateurService} from '../service/utilisateur.service';

@Component({
  selector: 'app-tableau',
  standalone: true,
  imports: [
    MatTableModule
  ],
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.css']
})
export class TableauComponent implements OnInit {
  users!: MatTableDataSource<Utilisateur>;
  columnsToDisplay = ['nom', 'prenom', 'mail', 'username'];

  constructor(private readonly userService: UtilisateurService ) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.get_utilisateurs().subscribe(data => {
      this.users = new MatTableDataSource(data);
      });
  }
}
