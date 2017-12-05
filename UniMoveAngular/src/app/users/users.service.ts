import { Injectable, Inject } from '@angular/core'
import { User } from '../app.models';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';


@Injectable()
export class UsersService{

    private apiUrl: string;
    public users: User[];
    public loggedUser: User;
    public isUserLogged: boolean;

    constructor(
        private http: Http,
        private router: Router
    ){
        this.apiUrl = 'https://born2code-d2578.firebaseio.com/loremipsum/unimove/users.json';
        this.updateUsers()
            .subscribe(arg =>{
                this.users = arg;
                console.log(arg);
            });
        this.loggedUser = new User();
        this.isUserLogged = false;
    }

    private updateUsers(){
        return this.http.get(this.apiUrl)
            .map((res: Response) => res.json())
    }
    
    public login(user: User){
        this.loggedUser = user;
        localStorage.setItem('loggedUser',JSON.stringify(this.loggedUser));
        this.isUserLogged = true;
        this.router.navigateByUrl('/home');
    }

    public logout(){
        this.loggedUser = new User;
        localStorage.removeItem('loggedUser');
        this.isUserLogged = false;
        this.router.navigateByUrl('/login');
    }

    public getUserFromID(id: number): User{
        for (var user of this.users){
            if(user.id == id){
                return user;
            }
        }
        return null;
    }
}