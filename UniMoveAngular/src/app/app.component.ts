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

  loggedUser: User;

  constructor(
    private usersService: UsersService
  ){
    this.baseUrl = "https://born2code-d2578.firebaseio.com/";
    this.url = this.baseUrl + 'loremipsum/unimove/users.json';
    this.loggedUser = this.usersService.loggedUser;
    if (this.loggedUser.username){
      this.usersService.isUserLogged = true;
    }
    else{
      this.usersService.isUserLogged = false;
    }
  }
}
