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

  constructor(
    private usersService: UsersService
  ){

  }
}