import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { routing } from './app.routes';
import { UsersService } from './users/users.service';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './profile/profile.component';
import { FaqComponent } from './faq/faq.component';


@NgModule({
  declarations: [
    AppComponent, LoginComponent, HeaderComponent, HomeComponent, LogoutComponent, ProfileComponent, FaqComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpModule, routing
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
