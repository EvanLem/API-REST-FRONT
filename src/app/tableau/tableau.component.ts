import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-tableau',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.css']
})
export class TableauComponent implements OnInit {
  users: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.http.get<any[]>('http://localhost:8080/api/user')
      .subscribe(data => {
        this.users = data;
      }, error => {
        console.error('Error fetching users:', error);
      });
  }
}
