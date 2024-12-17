import {Component, Input, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule}from '@angular/common';
import {MatFormFieldModule}from '@angular/material/form-field';
import {MatInputModule}from '@angular/material/input';
import {MatButtonModule}from '@angular/material/button';
import {ActivatedRoute, Router}from '@angular/router';
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
  @Input() mode: 'add' | 'update' = 'add'; // en add par défaut
  id!: number;
  user!: Utilisateur;

  constructor(private readonly userService: UtilisateurService, private route: ActivatedRoute, private readonly router: Router) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.mode = this.route.snapshot.paramMap.get('mode') as 'add' | 'update';
      if (this.mode === 'update') {
        this.id = Number(this.route.snapshot.paramMap.get('id'));
        this.getUser();
      }
      else {
        this.user = {
          id: 0,
          nom: '',
          prenom: '',
          mail: '',
          username: '',
          password: ''
        }
      }
    });
  }

  getUser() {
    this.userService.get_utilisateurs_id(this.id).subscribe(data => {
      this.user = data;
    });
  }

  updateUser() {
    try {
      this.userService.update_utilisateur(this.user).subscribe({
        next: () => {
          alert("Mise à jour de l'utilisateur : " + this.user.username);
          this.router.navigate(['/utilisateur/data']);
        }
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'utilisateur", error);
    }
  }

  addUser(): void {
    try {
      this.userService.create_utilisateur(this.user).subscribe({
        next: () => {
          alert("Suppression de l'utilisateur");
          this.router.navigate(['/utilisateur/data']);
        }
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'utilisateur", error);
    }
  }

  onSubmit() {
    if (this.mode === 'update') {
      this.updateUser();
    } else {
      this.addUser();
    }
  }
}
