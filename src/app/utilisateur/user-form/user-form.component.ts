import {Component, EventEmitter, Inject, Input, numberAttribute, OnInit, Output} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Utilisateur } from '../../model/utilisateur.model';
import { UtilisateurService } from '../../service/utilisateur.service';
import {NgIf} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {tap} from 'rxjs';

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
  id!: number;
  user!: Utilisateur;

  constructor(private readonly userService: UtilisateurService, private route:ActivatedRoute) {}

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
    this.userService.update_utilisateur(this.user);
    alert(this.user.username);
  }
}
