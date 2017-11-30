import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { Event } from './app.models';


@Injectable()
export class AppService{

    private apiUrl: string;
    public events: Event[];
    public lastEvent: number;
    public filter: number;

    constructor(private http: Http){
        this.apiUrl = 'https://born2code-d2578.firebaseio.com/loremipsum/unimove/events';
        this.updateEvents().subscribe(arg => this.events = arg);
        this.getLastEvent().subscribe(arg => this.lastEvent = arg);
    }

    public updateEvents(){
        return this.http.get(this.apiUrl + '.json')
            .map((res: Response) => res.json());
    }

    public getLastEvent(){
        return this.http.get(this.apiUrl + 'lastEvent.json')
            .map((res: Response) => res.json());
    }

    public setLastEvent(){
        this.http.put(this.apiUrl + 'lastEvent.json', this.lastEvent);
    }

    public setFilter(id: number){
        if (this.filter != id && id != -1){
            this.filter = id;
        }
        else{
            this.filter = -1;
        }
        console.log('filter = ' + this.filter);
    }

    public resetFilter(){
        this.setFilter(-1);
    }
}