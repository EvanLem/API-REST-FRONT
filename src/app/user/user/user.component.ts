import {Component, OnInit} from '@angular/core';
import {User} from '../../model/user.model';
import {UserService} from '../../service/user.service';
import {CommonModule} from '@angular/common';
import {MatCell, MatColumnDef, MatHeaderCell, MatHeaderRow, MatRow, MatTable} from '@angular/material/table';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, MatTable, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatColumnDef],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.userService.getUsers().subscribe(
      users => this.users = users
    );
  }
}
