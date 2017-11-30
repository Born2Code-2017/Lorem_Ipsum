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
import { SidebarComponent } from './sidebar/sidebar.component';
import { AppService } from './app.service';
import { EventsComponent } from './events/events.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    AppComponent, LoginComponent, HeaderComponent, HomeComponent,
    SidebarComponent, EventsComponent, ProfileComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpModule, routing
  ],
  providers: [UsersService, AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
