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
        this.apiUrl = 'https://born2code-d2578.firebaseio.com/loremipsum/unimove/users';
        this.updateUsers()
            .subscribe(arg =>{
                this.users = arg;
            });
        this.loggedUser = new User();
        this.isUserLogged = false;
    }

    private updateUsers(){
        return this.http.get(this.apiUrl + '.json')
            .map((res: Response) => res.json())
    }
    
    public login(user: User){
        this.http.get(this.apiUrl + '/' + (user.id - 1) + '.json')
            .map((res: Response) => res.json())
            .subscribe(arg =>{
                this.loggedUser = arg;
            localStorage.setItem('loggedUser',JSON.stringify(this.loggedUser));
            this.isUserLogged = true;
            this.router.navigateByUrl('/home');
            });
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

    public updateUser(){
        return this.http.put(this.apiUrl + '/' + (this.loggedUser.id - 1) + '.json', this.loggedUser)
            .map((res: Response) => res.json());
    }
}