import { Component, Input } from '@angular/core';
import { Event } from '../app.models';
import { UsersService } from '../users/users.service';

@Component({
    selector: 'app-event',
    templateUrl: 'event.component.html'
})

export class EventComponent {

    @Input()
    event: Event;

    constructor(
        private usersService: UsersService
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
}