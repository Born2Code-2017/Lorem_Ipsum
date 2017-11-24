import { Component } from '@angular/core';
import { User } from '../app.models';
import { UsersService } from '../users/users.service';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css']
})

export class HeaderComponent {

    constructor(
        private userService: UsersService
    ) {
        
    }

    logUser(){
        console.log(this.userService.loggedUser)
    }

}