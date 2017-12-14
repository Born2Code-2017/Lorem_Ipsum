import { Component, Input } from '@angular/core';
import { Event } from '../app.models';
import { UsersService } from '../users/users.service';
import { AppService } from '../shared/app.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-event',
    templateUrl: 'event.component.html',
    styleUrls: ['event.component.css']
})

export class EventComponent {

    @Input()
    event: Event;

    constructor(
        private usersService: UsersService,
        private appService: AppService,
        private router: Router
    ) {
        this.event = new Event();
    }

    getOwnerPhoto(): string{
        if(this.event.owner){
            return this.usersService.getUserFromID(this.event.owner).fotoProfilo;
        }
        else{
            return '';
        }
    }

    setAsActive(){
        this.router.navigateByUrl('/event');
        this.appService.updateActiveEvent(this.event);
    }

    getPartecipanti(){
        if (this.event.partecipanti){
            return this.event.partecipanti.length;
        }
        return '0';
    }
}