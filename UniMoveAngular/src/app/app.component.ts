import { Component } from '@angular/core';
import { User } from './app.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './login/login.component.css']
})
export class AppComponent {
  title = 'UniMove';
  baseUrl: string;
  url: string;

  users: User[];
  loggedUser: User;
  isUserLogged: boolean;

  constructor(){
    this.baseUrl = "https://born2code-d2578.firebaseio.com/";
    this.url = this.baseUrl + 'loremipsum/unimove/users.json';
    this.loadUsers();
    this.isUserLogged = false;
  }

  loadUsers(){
    let user0 = new User();
    user0.username = 'Luca';
    user0.password = 'Luca';
    user0.dataDiNascita = '2017-11-16';
    user0.urlFotoProfilo = 'assets/img/luca.png';
    user0.facolta = 'Medicina';
    user0.partecipa = [];
    user0.creati = [];
    let user1 = new User();
    user1.username = 'Andrea';
    user1.password = 'Andrea';
    user1.dataDiNascita = '2017-11-16';
    user1.urlFotoProfilo = 'assets/img/andrea.png';
    user1.facolta = 'Matematica';
    user1.partecipa = [];
    user1.creati = [];
    this.users = [user0, user1]
  }

  userLogged(){
    this.isUserLogged = true;
  }
}
