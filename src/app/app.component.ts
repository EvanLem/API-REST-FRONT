import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {TableauComponent} from './tableau/tableau.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, HttpClientModule, TableauComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'api-rest-front';
  id: string = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.get(`http://localhost:8080/api/utilisateurs/${this.id}`)
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
}
