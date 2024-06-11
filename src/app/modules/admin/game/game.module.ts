import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key';
import { SharedModule } from 'app/shared/shared.module';
import { gameRoutes } from './game.routing';
import { GameComponent } from './game.component';
import { FlashCardsComponent } from './flashcards/flashcards.component';
import { GameListComponent } from './list/list.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FuseCardModule } from '@fuse/components/card';
import { HangmanComponent } from './hangman/hangman.component';
import { SimonSaysComponent } from './simon-says/simon-says.component';

@NgModule({
    declarations: [
        GameComponent,
        FlashCardsComponent,
        GameListComponent,
        HangmanComponent,
        SimonSaysComponent
    ],
    imports     : [
        RouterModule.forChild(gameRoutes),
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressBarModule,
        MatSelectModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatTooltipModule,
        FuseFindByKeyPipeModule,
        SharedModule,
        MatTabsModule,
        FuseCardModule
    ]
})
export class GameModule
{
}
