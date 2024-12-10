import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TableauComponent } from './utilisateur/tableau/tableau.component';
import { MatTableModule } from '@angular/material/table';
import { UserFormComponent } from './utilisateur/user-form/user-form.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, // Use CommonModule instead of BrowserModule
    RouterOutlet,
    FormsModule,
    HttpClientModule,
    TableauComponent,
    MatTableModule,
    UserFormComponent,
    MatToolbarModule,
    MatButtonModule,
    RouterLink,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'api-rest-front';
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

  protected readonly TableauComponent = TableauComponent;
}
