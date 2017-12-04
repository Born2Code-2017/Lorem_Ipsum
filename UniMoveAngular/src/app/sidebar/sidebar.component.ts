import { Component } from '@angular/core';
import { AppService } from '../shared/app.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['sidebar.component.css']
})

export class SidebarComponent {
    constructor(
        private appService: AppService,
        private router: Router
    ) { }

    createNewEvent(){
        if(!this.appService.workingOnAnEvent){
            this.appService.workingOnAnEvent = true;
            this.appService.lastEvent++;
            this.appService.setLastEvent()
                .subscribe(arg =>{
                    this.appService.activeEvent = this.appService.lastEvent;
                    this.router.navigateByUrl('/newEvent');
                });
        }
    }
}