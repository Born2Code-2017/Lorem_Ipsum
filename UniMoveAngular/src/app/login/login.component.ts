import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../app.models';
import { Router } from '@angular/router';
import { UsersService } from '../users/users.service';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent {

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
    }

    login() {
        for (let user of this.usersService.users) {
            if (user.username.toLocaleLowerCase() == this.username.toLocaleLowerCase() && this.password != '') {
                this.isLoginFailed = false;
                this.usersService.loggedUser = user;
                this.usersService.isUserLogged = true;
                this.router.navigateByUrl('/home');
                break;
            }
            else {
                this.usersService.isUserLogged = false;
                this.isLoginFailed = true;
            }
        }
    }

    resetValidators() {
        this.isLoginFailed = false;
    }
}