import { Route } from '@angular/router';
import { GameComponent } from './game.component';
import { GameListComponent } from './list/list.component';
import { FlashCardsComponent } from './flashcards/flashcards.component';
import { GameCategoriesResolver, GamesResolver, GameResolver, RoundResolver } from './game.resolvers';

export const gameRoutes: Route[] = [
    {
        path     : '',
        component: GameComponent,
        resolve  : {
            categories: GameCategoriesResolver
        },
        children : [
            {
                path     : '',
                pathMatch: 'full',
                component: GameListComponent,
                resolve  : {
                    courses: GamesResolver
                }
            },
            {
                path     : 'flashcards',
                component: FlashCardsComponent,
                runGuardsAndResolvers: 'always',
                resolve  : {
                    round: RoundResolver
                }
            }
        ]
    }
];
