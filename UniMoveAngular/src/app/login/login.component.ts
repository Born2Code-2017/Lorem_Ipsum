import { Component, Input, EventEmitter, Output } from '@angular/core';
import {NgForm} from '@angular/forms';
import { User } from '../app.models';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent {

    username: string;
    password: string;

    isLoginFailed: boolean;

    @Output()
    onSuccessfulLogin: EventEmitter<any>;

    @Input()
    users: User[];

    @Input()
    loggedUser: User;

    constructor() {
        this.username = '';
        this.password = '';
        this.isLoginFailed = false;
        this.onSuccessfulLogin = new EventEmitter();
    }

    login(){
        for (let user of this.users){
            if (user.username == this.username){
                this.isLoginFailed = false;
                this.loggedUser = user;
            this.onSuccessfulLogin.emit()
                break;
            }
            else{
                this.isLoginFailed = true;
            }
        }
    }

}