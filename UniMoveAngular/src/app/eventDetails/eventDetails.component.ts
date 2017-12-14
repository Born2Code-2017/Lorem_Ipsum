import { Component } from '@angular/core';
import { UsersService } from '../users/users.service';
import { Router } from '@angular/router';
import { Event, User } from '../app.models';
import { AppService } from '../shared/app.service';

@Component({
    selector: 'app-eventDetails',
    templateUrl: 'eventDetails.component.html'
})

export class EventDetailsComponent {

    owner: User;
    private activeEvent: Event;
    private isUserGoingToPartecipate: boolean;
    private partecipanti: number;

    constructor(
        private userService: UsersService,
        private appService: AppService,
        private router: Router
    ) {
        if(!this.userService.isUserLogged) this.router.navigateByUrl('/login');
        // Per il primo caricamento sucessiovo al routing non riesco a catturare l'aggiornamento della subject quindi uso una variabile (appService.lastActive)
        this.activeEvent = this.appService.lastActive;
        if(!this.activeEvent){
            this.router.navigateByUrl('/home');
        }
        else{
            if(!this.activeEvent.id){
                this.activeEvent.id = this.appService.lastEvent;
            }
            if(this.activeEvent.owner){
                this.owner = this.userService.getUserFromID(this.activeEvent.owner);
            }
        }
        if (this.activeEvent){
            this.isUserGoingToPartecipate = this.checkConfirm();
            this.countPartecipanti();
        }
        // Mi sottoscrivo ai futuri cambiamenti dell'evento attivo
        this.appService.activeEvent
            .subscribe( arg =>{
                this.activeEvent = arg;
                if(!this.activeEvent){
                    this.router.navigateByUrl('/home');
                }
                else{
                    if(!this.activeEvent.id){
                        this.activeEvent.id = this.appService.lastEvent;
                    }
                    if(this.activeEvent.owner){
                        this.owner = this.userService.getUserFromID(this.activeEvent.owner);
                    }
                }
                this.isUserGoingToPartecipate = this.checkConfirm();
                this.countPartecipanti();
            });
    }

    annulla(){
        this.activeEvent = null;
        this.appService.updateActiveEvent(this.activeEvent);
        this.router.navigateByUrl('/home');
    }

    save(){
        if(!this.activeEvent.owner){
            this.activeEvent.owner = this.userService.loggedUser.id;
        }
        this.appService.pushNewEvent(this.activeEvent)
            .subscribe(arg =>{
                this.activeEvent = null;
                this.appService.updateActiveEvent(this.activeEvent);
                this.appService.updateEvents();
                this.router.navigateByUrl('/home');
            });
    }

    partecipate(){
        if (!this.activeEvent.partecipanti){
            this.activeEvent.partecipanti = [];
        }
        if (this.activeEvent.partecipanti.indexOf(this.userService.loggedUser.id) == -1){
            this.activeEvent.partecipanti.push(this.userService.loggedUser.id);
        }
        // aggiorno l'evento
        this.appService.pushNewEvent(this.activeEvent)
            .subscribe(arg =>  this.appService.updateEvents());
        if (this.userService.loggedUser.partecipa.indexOf(this.activeEvent.id) == -1){
            this.userService.loggedUser.partecipa.push(this.activeEvent.id);
        }
        this.userService.updateUser().subscribe();
        this.appService.updateActiveEvent(this.activeEvent);
    }

    checkConfirm(){
        if (this.activeEvent){
            if (!this.userService.loggedUser.partecipa){
                this.userService.loggedUser.partecipa = [];
                this.appService.updateActiveEvent(this.activeEvent);
            }
            if (this.userService.loggedUser.partecipa.indexOf(this.activeEvent.id) != -1){
                return true;
            }
        }
        return false;
    }

    private countPartecipanti(){
        if (this.activeEvent){
            if (this.activeEvent.partecipanti){
                this.partecipanti = this.activeEvent.partecipanti.length;
            }
            else{
                this.partecipanti = 0;
            }
        }
    }
}