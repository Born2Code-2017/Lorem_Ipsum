import { Component } from '@angular/core';
import { AppService } from '../shared/app.service';
import { ValuesPipe } from '../shared/values.pipe';
import { DailyEvents } from '../app.models';

@Component({
    selector: 'app-events',
    templateUrl: 'events.component.html',
    styleUrls: ['events.component.css']
})

export class EventsComponent {

    public events: DailyEvents[];

    constructor(
        private appService: AppService
    ) {
        this.events = [];
        this.appService.events.subscribe(
            arg =>{
                this.events = arg;
        })
        this.appService.updateEvents();
    }
}