import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { Event } from '../app.models';


@Injectable()
export class AppService{

    private apiUrl: string;
    public events: Subject<any>;
    public activeEvent: number;
    public lastEvent: number;

    private privateFilter: number;
    public filter: Subject<number>;

    public workingOnAnEvent: boolean;

    constructor(private http: Http){
        this.apiUrl = 'https://born2code-d2578.firebaseio.com/loremipsum/unimove';
        this.workingOnAnEvent = false;
        this.events = new Subject();
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
    }

    public updateEvents(){
        return this.http.get(this.apiUrl + '/events.json')
            .map((res: Response) => res.json())
            .subscribe(arg => this.events.next(arg));
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
}