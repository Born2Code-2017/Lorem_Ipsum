import { ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './profile/profile.component';
import { FaqComponent } from './faq/faq.component';

const appRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    },
    {
        path: 'faq',
        component: FaqComponent
    },
    {
        path: 'header',
        component: HeaderComponent
    },
    {
        path: 'logout',
        component: LogoutComponent
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }
]

export const routing: ModuleWithProviders =
    RouterModule.forRoot(appRoutes);