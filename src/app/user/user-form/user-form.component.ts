import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserService} from '../../service/user.service';
import {User} from '../../model/user.model';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  user: User = { id: 0, nom: '', prenom: '', username: '', mail: '', password: ''};
  constructor(private userService: UserService, private router: Router,) { }

  ngOnInit(): void {
  }

  addUser(): void {
    this.userService.addUser(this.user).subscribe(
      () => {
        this.router.navigate(['/users']);
      }
    );
  }
}
