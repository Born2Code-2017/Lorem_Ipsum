import { Injectable, Inject } from '@angular/core'
import { User } from '../app.models';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class UsersService{

    private apiUrl: string;
    public users: User[];
    public loggedUser: User;
    public isUserLogged: boolean;

    constructor(private http: Http){
        this.apiUrl = 'https://born2code-d2578.firebaseio.com/loremipsum/unimove/users.json';
        this.updateUsers()
            .subscribe(arg => this.users = arg);
        this.loggedUser = new User();
    }

    private updateUsers(){
        return this.http.get(this.apiUrl)
            .map((res: Response) => res.json())
    }
}