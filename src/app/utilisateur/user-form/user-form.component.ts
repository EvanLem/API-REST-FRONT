import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule}from '@angular/common';
import {MatFormFieldModule}from '@angular/material/form-field';
import {MatInputModule}from '@angular/material/input';
import {MatButtonModule}from '@angular/material/button';
import {ActivatedRoute}from '@angular/router';
import {UtilisateurService}from '../../service/utilisateur.service';
import {Utilisateur}from '../../model/utilisateur.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  id!: number;
  user!: Utilisateur;

  constructor(private readonly userService: UtilisateurService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getUser();
  }

  getUser() {
    this.userService.get_utilisateur(this.id).subscribe(data => {
      this.user = data;
    });
  }

  updateUser() {
    this.userService.update_utilisateur(this.user).subscribe();
    alert(this.user.username);
  }
}