import { Component } from '@angular/core';
import { UsersService } from '../users/users.service';
import { Router } from '@angular/router';
import { Event, User } from '../app.models';
import { AppService } from '../shared/app.service';

@Component({
    selector: 'app-eventDetails',
    templateUrl: 'eventDetails.component.html'
})

export class EventDetailsComponent {

    owner: User;

    constructor(
        private userService: UsersService,
        private appService: AppService,
        private router: Router
    ) {
        if(!this.userService.isUserLogged) this.router.navigateByUrl('/login');
        if(!this.appService.activeEvent){
            this.router.navigateByUrl('/home');
        }
        else{
            if(!this.appService.activeEvent.id){
                this.appService.activeEvent.id = this.appService.lastEvent;
            }
            if(this.appService.activeEvent.owner){
                this.owner = this.userService.getUserFromID(this.appService.activeEvent.owner);
                console.log(this.owner);
            }
        }
    }

    annulla(){
        this.appService.activeEvent = null;
        this.router.navigateByUrl('/home');
    }

    save(){
        if(!this.appService.activeEvent.owner){
            this.appService.activeEvent.owner = this.userService.loggedUser.id;
        }
        this.appService.pushNewEvent(this.appService.activeEvent)
            .subscribe(arg =>{
                this.appService.activeEvent = null;
                this.appService.updateEvents();
                this.router.navigateByUrl('/home');
            });
    }
}