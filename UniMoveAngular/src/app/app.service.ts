import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { Event } from './app.models';


@Injectable()
export class AppService{

    private apiUrl: string;
    public events: Event[];
    public filter: number;

    constructor(private http: Http){
        this.apiUrl = 'https://born2code-d2578.firebaseio.com/loremipsum/unimove/events';
        this.updateEvents()
            .subscribe(arg => this.events = arg);
    }

    public updateEvents(){
        return this.http.get(this.apiUrl + '.json')
            .map((res: Response) => res.json())
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