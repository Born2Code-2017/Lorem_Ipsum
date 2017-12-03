import { Component } from '@angular/core';
import { UsersService } from '../users/users.service';
import { Router } from '@angular/router';
import { AppService } from '../shared/app.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})

export class HomeComponent{
    constructor(
        private userService: UsersService,
        private appService: AppService,
        private router: Router
    ) {
        if(!this.userService.isUserLogged) this.router.navigateByUrl('/login');
        this.appService.workingOnAnEvent = false;
    }
}