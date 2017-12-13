import { Component } from '@angular/core';
import { AppService } from '../shared/app.service';
import { Router } from '@angular/router';
import { Event } from '../app.models';
import { UsersService } from '../users/users.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['sidebar.component.css']
})

export class SidebarComponent {
    constructor(
        private appService: AppService,
        private userService: UsersService,
        private router: Router
    ) { }

    createNewEvent(){
        if(!this.appService.activeEvent){
            this.appService.lastEvent++;
            this.appService.updateActiveEvent(new Event());
            this.appService.setLastEvent()
                .subscribe(arg =>{
                    this.router.navigateByUrl('/event');
                });
        }
    }
}