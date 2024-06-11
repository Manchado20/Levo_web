import { Route } from '@angular/router';
import { GameComponent } from './game.component';
import { GameListComponent } from './list/list.component';
import { FlashCardsComponent } from './flashcards/flashcards.component';
import { HangmanComponent } from './hangman/hangman.component';
import { SimonSaysComponent } from './simon-says/simon-says.component';

import { GameCategoriesResolver, GamesResolver, GameResolver, RoundResolver, RoundHangMan } from './game.resolvers';

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
            },
            {
                path     : 'hangman',
                component: HangmanComponent,
                runGuardsAndResolvers: 'always',
                // resolve  : {
                //     round: RoundHangMan
                // }
            },
            {
                path     : 'simon-says',
                component: SimonSaysComponent,
                runGuardsAndResolvers: 'always',
                // resolve  : {
                //     round: RoundHangMan
                // }
            }
        ]
    }
];
