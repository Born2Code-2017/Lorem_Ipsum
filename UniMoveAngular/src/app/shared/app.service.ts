import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';

import { Event, DailyEvents } from '../app.models';


@Injectable()
export class AppService{

    private apiUrl: string;
    public events: Subject<any>;
    public activeEvent: Subject<any>;
    public lastActive: Event; // Useful in case of a activeEvent value change during routing
    public lastEvent: number;

    private privateFilter: number;
    public filter: Subject<number>;

    constructor(private http: Http){
        this.apiUrl = 'https://born2code-d2578.firebaseio.com/loremipsum/unimove';
        this.events = new Subject();
        this.activeEvent = new Subject();
        this.filter = new Subject();
        this.updateEvents();
        this.getLastEvent().subscribe(arg => {
            this.lastEvent = arg
            if (this.lastEvent == null){
                this.lastEvent = -1;
                this.setLastEvent();
            }
        });
        this.http.put(this.apiUrl + '/lastEvent.json', '1');
        this.activeEvent.next(null);
    }

    public updateEvents(){
        return this.http.get(this.apiUrl + '/events.json')
            .map((res: Response) => res.json())
            .subscribe(arg =>{
                this.events.next(arg);
                this.orderEventsByDate(arg);
            });
    }

    public updateActiveEvent(event: Event){
        if (!this.activeEvent){
            this.activeEvent = new Subject();
        }
        this.activeEvent.next(event);
        this.lastActive = event;
    }

    public getLastEvent(){
        return this.http.get(this.apiUrl + '/lastEvent.json')
            .map((res: Response) => res.json());
    }

    public setLastEvent(){
        return this.http.put(this.apiUrl + '/lastEvent.json', this.lastEvent)
            .map((response: Response) => response.json());
    }

    public setFilter(id: number){
        if (this.privateFilter != id && id != -1){
            this.privateFilter = id;
        }
        else{
            this.privateFilter = -1;
        }
        this.filter.next(this.privateFilter);
    }

    public resetFilter(){
        this.setFilter(-1);
    }

    public pushNewEvent(event: Event){
        return this.http.put(this.apiUrl + '/events/' + event.id + '.json', event)
            .map((response: Response) => response.json());
    }
    
    public deleteEvent(event: Event){
        return this.http.delete(this.apiUrl + '/events/' + event.id + '.json')
            .map((response: Response) => response.json());
    }

    private orderEventsByDate(events: Event[]){
        var previousDate = '----/--/--';
        var sortedEvents = events;
        var eventsByDate: DailyEvents[] = [];

        sortedEvents = _.sortBy(sortedEvents, e => e.data);
        
        for (let event of sortedEvents)
        {
            if (event.data && event.data != previousDate)
            {
                eventsByDate.push(new DailyEvents());
                eventsByDate[eventsByDate.length -1].events = [];
    
                if(this.getYear(event.data) != previousDate.substring(0,4))
                {
                    eventsByDate[eventsByDate.length -1].date = this.getDay(event.data) + ' ' + this.getMonth(event.data) + ' ' + this.getYear(event.data);
                }
                else
                {
                    if(event.data.substring(5,7) != previousDate.substring(5,7))
                    {
                        eventsByDate[eventsByDate.length -1].date = this.getDay(event.data) + '  '+ this.getMonth(event.data);
                    }
                    else
                    {
                        eventsByDate[eventsByDate.length -1].date = this.getDay(event.data);
                    }
                }
                previousDate = event.data;
            }
            eventsByDate[eventsByDate.length -1].events.push(event);
        }
        this.events.next(eventsByDate);
    }
    private getYear(data: string): string
    {
        return data.substring(0,4);
    };
    private getMonth(data: string): string
    {
        switch (data.substring(5,7))
        {
            case '01':
                return 'gennaio';
            case '02':
                return 'febbraio';
            case '03':
                return 'marzo';
            case '04':
                return 'aprile';
            case '05':
                return 'maggio';
            case '06':
                return 'giugno';
            case '07':
                return 'luglio';
            case '08':
                return 'agosto';
            case '09':
                return 'settembre';
            case '10':
                return 'ottobre';
            case '11':
                return 'novembre';
            case '12':
                return 'dicembre';
        }
    };
    private getDay(data: string): string
    {
        return data.substring(8);
    }
}