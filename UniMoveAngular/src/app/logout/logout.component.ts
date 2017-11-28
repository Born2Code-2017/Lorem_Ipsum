import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../app.models';
import { Router } from '@angular/router';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  username: string;
  password: string;

  isLoginFailed: boolean;

  constructor(
    private router: Router,
    private usersService: UsersService
  ) {
    this.username = '';
    this.password = '';
    usersService.loggedUser = new User();
    this.isLoginFailed = false;
    this.logout();
  }

  logout() {
    this.usersService.isUserLogged = false;
    this.isLoginFailed = true;
  }

}
