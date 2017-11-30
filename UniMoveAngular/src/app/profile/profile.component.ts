import { Component } from '@angular/core';
import { UsersService } from '../users/users.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile',
    templateUrl: 'profile.component.html'
})

export class ProfileComponent{
    constructor(
        private userService: UsersService,
        private router: Router
    ) {
        console.log(this.userService);
        //if(!this.userService.isUserLogged) this.router.navigateByUrl('/login');
    }
}