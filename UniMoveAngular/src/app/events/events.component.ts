import { Component } from '@angular/core';
import { AppService } from '../shared/app.service';
import { ValuesPipe } from '../shared/values.pipe';

@Component({
    selector: 'app-events',
    templateUrl: 'events.component.html',
    styleUrls: ['events.component.css']
})

export class EventsComponent {

    public events: Event[];

    constructor(
        private appService: AppService
    ) {
        this.events = [];
        this.appService.events.subscribe(
            arg =>{
                this.events = arg;
        })
    }
}