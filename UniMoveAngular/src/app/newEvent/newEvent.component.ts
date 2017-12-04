import { Component } from '@angular/core';
import { UsersService } from '../users/users.service';
import { Router } from '@angular/router';
import { Event } from '../app.models';
import { AppService } from '../shared/app.service';

@Component({
    selector: 'app-newEvent',
    templateUrl: 'newEvent.component.html'
})

export class NewEventComponent {

    event: Event;

    constructor(
        private userService: UsersService,
        private appService: AppService,
        private router: Router
    ) {
        if(!this.userService.isUserLogged) this.router.navigateByUrl('/login');
        this.event = new Event();
        this.event.id = this.appService.activeEvent;
        console.log(this.userService.loggedUser);
        this.event.owner = this.userService.loggedUser.id;
    }

    annulla(){
        this.appService.lastEvent--;
        this.appService.activeEvent = -1;
        this.appService.workingOnAnEvent = false;
        this.appService.setLastEvent()
            .subscribe(arg => this.router.navigateByUrl('/home'));
    }

    save(){
        this.appService.workingOnAnEvent = false;
        this.appService.pushNewEvent(this.event)
            .subscribe(arg =>{
                this.appService.updateEvents();
                this.router.navigateByUrl('/home');
            });
    }
}