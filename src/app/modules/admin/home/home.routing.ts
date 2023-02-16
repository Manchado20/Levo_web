import { Route } from '@angular/router';
import { HomeComponent } from './home.component'; 
import { HomeResolver } from './home.resolvers';

export const homeRoutes: Route[] = [
    {
        path     : '',
        component: HomeComponent,
        resolve  : {
            data: HomeResolver
        }
    }
];
