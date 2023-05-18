import { Route } from '@angular/router';
import { WordsComponent } from './words.component'; 
import { WordsResolver } from './words.resolvers';

export const wordsRoutes: Route[] = [
    {
        path     : '',
        component: WordsComponent,
        resolve  : {
            data: WordsResolver
        }
    }
];
