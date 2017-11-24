import { Component, Output } from '@angular/core';
import { User } from './app.models';
import { UsersService } from './users/users.service';

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
  @Output() loggedUser: User;
  @Output() logUser: User;
  isUserLogged: boolean;

  test: string;

  constructor(
    private usersService: UsersService
  ){
    this.baseUrl = "https://born2code-d2578.firebaseio.com/";
    this.url = this.baseUrl + 'loremipsum/unimove/users.json';
  }
}
