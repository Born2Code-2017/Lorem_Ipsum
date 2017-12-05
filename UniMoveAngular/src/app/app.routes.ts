import { ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { FaqComponent } from './faq/faq.component';
import { EventDetailsComponent } from './eventDetails/eventDetails.component';

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
        path: 'event',
        component: EventDetailsComponent
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }
]

export const routing: ModuleWithProviders =
    RouterModule.forRoot(appRoutes, {useHash: true});