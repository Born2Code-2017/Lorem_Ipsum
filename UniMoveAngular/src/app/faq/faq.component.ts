import { Component } from '@angular/core';
import { UsersService } from '../users/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent{
  constructor(
    private userService: UsersService,
    private router: Router
) {
    if(!this.userService.isUserLogged) this.router.navigateByUrl('/login');
}
}
