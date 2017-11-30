import { Component } from '@angular/core';
import { User } from '../app.models';
import { UsersService } from '../users/users.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css']
})

export class HeaderComponent {

    loggedUser: User;

    constructor(
        private router: Router,
        private usersService: UsersService
    ){
        this.loggedUser = this.usersService.loggedUser;
        console.log(this.loggedUser);
    }
}