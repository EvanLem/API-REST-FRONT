import {Component, Inject, Input, numberAttribute, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Utilisateur } from '../model/utilisateur.model';
import { UtilisateurService } from '../service/utilisateur.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  @Input() showForm!: boolean;
  @Input() id!: number;
  user!: Utilisateur;

  constructor(private readonly userService: UtilisateurService) {}

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userService.get_utilisateur(this.id).subscribe(data => {
      this.user = data;
    });
  }

  updateUser() {
    alert('User updated');
  }
}
