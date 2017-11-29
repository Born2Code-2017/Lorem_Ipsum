import { Component } from '@angular/core';
import { UsersService } from '../users/users.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})

export class HomeComponent{
    constructor(
        private userService: UsersService,
        private router: Router
    ) {
        if(!this.userService.isUserLogged) this.router.navigateByUrl('/login');
    }
}