import { Component } from '@angular/core';
import { User } from '../app.models';
import { UsersService } from '../users/users.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile',
    templateUrl: 'profile.component.html',
    styleUrls: ['./profile.component.css']
})

export class ProfileComponent {
    user: User;
    constructor(
        private userService: UsersService,
        private router: Router
    ) {
        if (!this.userService.isUserLogged) this.router.navigateByUrl('/login');
        this.user = this.userService.loggedUser;
    }
}