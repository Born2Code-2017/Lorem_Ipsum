import { Component } from '@angular/core';
import { AppService } from '../app.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['sidebar.component.css']
})

export class SidebarComponent {
    constructor(
        private appService: AppService
    ) { }
}