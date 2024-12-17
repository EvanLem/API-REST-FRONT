import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {GameComponent} from './game/game/game.component';
import {MatTableModule} from '@angular/material/table';
import {GameFormComponent} from './game/game-form/game-form.component';

import {UserComponent} from './user/user/user.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    UserComponent,
    RouterOutlet,
    RouterLink,
    FormsModule,
    HttpClientModule,
    GameComponent,
    GameFormComponent,
    MatTableModule
  ],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projet-curd';

  id: string = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.get(`http://localhost:8080/api/user/${this.id}`)
      .subscribe(response => {
        console.log(response);
        //write response into p tag of id "answer"
        let doc = document.getElementById('answer');
        if(doc) {
          doc.innerText = JSON.stringify(response);
        }
      }, error => {
        console.error('Error fetching user:', error);
      });
  }

  protected readonly TableauComponent = GameComponent;


}



/*
import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {UserService} from './service/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'projet-curd';

  constructor(private userService: UserService)
  {}

  ngOnInit() {
    this.userService.getUsers()
      .subscribe(data => {
        console.log(data)
      })
  }
}

 */
