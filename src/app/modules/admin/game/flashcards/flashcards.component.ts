import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { interval, Observable, of, Subject } from 'rxjs';
import { catchError, switchMap, takeUntil } from 'rxjs/operators';
import { Round, RoundItem } from '../game.types';
import { GameService } from '../game.service';
import { ThemePalette } from '@angular/material/core';
import { FuseCardComponent } from '@fuse/components/card';
import { Router } from '@angular/router';
import { SpeechSynthesis } from '../../../../lib/speech/synthesis';
import { TimerSound } from '../../../../lib/sound/timersound';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { FlipSound } from 'app/lib/sound/flipsound';
import { CorrectSound } from 'app/lib/sound/correctsound';
import { IncorrectSound } from 'app/lib/sound/incorrectsound';
import confetti from 'canvas-confetti';

@Component({
    selector       : 'game-flashcards',
    templateUrl    : './flashcards.component.html',
    styleUrls: ['./flashcards.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlashCardsComponent implements OnInit, OnDestroy
{

    @ViewChild('flashcard')
    flashcard: FuseCardComponent;                           // Flascards that contains round items information.
    @ViewChild('inputResponse')
    inputResponse: ElementRef;                              // Form input control for receiving responses.
    @ViewChild('buttonResponse', {read: ElementRef})
    buttonResponse: ElementRef;                             // Form input control for receiving responses.

    progressBarTime: number = 15;                           // Time for responding every card in round game (in seconds).
    progressBarValue: number = 100;                         // Remaining time for the user to answer, it goes from 100 to 0.
    progressBarColor: ThemePalette = "primary";             // Top progress bar color, for indicating a warning on little remaining time.
    round: Round;                                           // Round game.
    responded: boolean;                                     // Flag for indicating if user has responded a flashcard.
    currentItemNumber: number;                              // Index of the current round item.
    currentItem: RoundItem = {};                            // A round item.
    response: string = '';                                  // Response given by user.
    roundStatus: string = 'playing';                        // Round status that can be: start, playing, end.
    correctResponses: number = 0;                           // Number of correct responses.
    responseTimes: number[] = [];                           // Array of all response times of every card.
    averageResponseTime: string = '0';                      // Average response time in whole round.
    speechSynthesis: SpeechSynthesis;                       // SpeechSynthesis for giving voice for every word.
    payload: any;                                           // Stores accessToken payload information.
    timerSound: TimerSound;
    flipSound: FlipSound;
    correctSound: CorrectSound;
    incorrectSound: IncorrectSound
    showGif = false;
    showGif2 = false;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        @Inject(DOCUMENT) private _document: Document,
        private _gameService: GameService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _httpClient: HttpClient,
    ){}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.payload = AuthUtils.getAccessTokenPayload(localStorage.accessToken);
        // Instatiate speech tool.
        this.speechSynthesis = new SpeechSynthesis();
        // Setup audio sound.
        this.timerSound = new TimerSound();
        this.flipSound = new FlipSound();
        this.correctSound = new CorrectSound();
        this.incorrectSound = new IncorrectSound();
        // Launch the round game.
        this.startRound();
    }

    /**
     * After view init.
     */
    ngAfterViewInit() {
        // Give focus to input text at round start.
        this.inputResponse.nativeElement.focus();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        this.timerSound.destroy();
        this.flipSound.destroy();
        this.correctSound.destroy();
        this.incorrectSound.destroy();
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Take a new word for showing a flashcard.
     * @param item
     */
    nextCard(item: RoundItem)
    {
        this.currentItem = item;
        this.responded = false;
        this.progressBarColor = "primary";
        const timer = interval(10);
        const seconds = this.progressBarTime * 1111111111100;
        this.speech(this.currentItem.word);
        const sub = timer.subscribe((sec) => {
            this.progressBarValue = 100 - sec * 100 / seconds;
            if(this.progressBarValue <= 30) {
                this.progressBarColor = "warn";
                if(this.progressBarValue == 25) {
                    this.timerSound.play();
                }
            }
            // If there is no more time or user responded.
            if (sec === seconds || this.responded === true) {
                sub.unsubscribe();
                // If still there are more cards, average response time is calculated.
                if(this.currentItemNumber < 10) {
                    this.currentItemNumber++;
                    this.responseTimes.push(sec/100);
                    this.averageResponseTime = (this.responseTimes.reduce((a, b) => a + b) / this.responseTimes.length).toFixed(2);
                }
                // Reset progress bar to initial state.
                this.progressBarValue = 100;
                this.progressBarColor = "primary";
                // If user did not respond in time, app automatically force response with whatever the user left in textbox.
                if(this.responded === false) {
                    this.responded = true;
                    this.buttonResponse.nativeElement.click();
                }
            }
            this._changeDetectorRef.markForCheck();
        });
    }

    /**
     * Take the user written word in textbox as a response for the flashcard.
     * @returns
     */
    respondCard(skip: boolean)
    {
        this.timerSound.pause();
        // Give the focus to textbox for responding again.
        if(this.response.trim() === "" && this.responded === false && !skip) {
            this.inputResponse.nativeElement.focus();
            return;
        }

        // Validate given response by user against correct translation.
        let correctResponse = false;
        
        let respuesta = this.response.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        let respuesta_usuario = this.currentItem.translation.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        console.log(respuesta.toLowerCase().trim(), '  this.response.toLowerCase().trim()');
        console.log(respuesta_usuario.toLowerCase().trim(), '  respuesta_usuario');

        if(this.response.toLowerCase().trim() === this.currentItem.translation.toLowerCase()) {
            this.correctResponses += 1;
            correctResponse = true;
        }
        if(correctResponse) {
            confetti({
                particleCount: 100,
                spread: 170,
                origin: { x: 0.6, y: 0.3 }, // Mueve el confeti hacia la derecha
            });
            this.correctSound.play();
            this.showGif2 = true;
            setTimeout(() => {
                this.showGif2 = false;
                this._changeDetectorRef.markForCheck();
            }, 3000);        
        } 
        else {
            this.incorrectSound.play();
            this.showGif = true;
            setTimeout(() => {
                this.showGif = false;
                this._changeDetectorRef.markForCheck();
            }, 3000);
            console.log('incorrecto');
        }

        // Sends user response for saving in database.
        let userResponse = {
            round: this.round._id,
            correct: correctResponse,
            time: this.progressBarValue < 100 ? this.progressBarTime - ((this.progressBarTime * this.progressBarValue)/100) : 0,
            word: this.currentItem.word,
            type: this.currentItem.type,
            translation: this.currentItem.translation
        };
        this._httpClient.post(environment.apiURL+'/response', userResponse).toPromise()
            .then((response: any) => {
                /* console.log(response); */
            }).catch((error: any) => {
                console.log(error);
            })

        // Flip flashcard for showing correct response.
        this.inputResponse.nativeElement.disabled = true;
        this.responded = true;
        this.flashcard.face = 'back';
        this._changeDetectorRef.markForCheck();
        setTimeout(() => {
            if(this.currentItemNumber === 10) {
                this.stopRound();
                return;
            }
            this.currentItem.translation = "";
            this._changeDetectorRef.markForCheck();
            this.flashcard.face = 'front';
            this.response = "";
            this.flipSound.play();
            setTimeout(() => {
                this.inputResponse.nativeElement.disabled = false;
                this.inputResponse.nativeElement.focus();
                this.nextCard(this.round.items[this.currentItemNumber]);
            }, 200);
        }, 3000);
    }

    /**
     * Start a new round.
     */
    startRound()
    {
        this.resetData();
        this._gameService.round$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((round: Round) => {
                this.round = round;
                this.currentItemNumber = 0;
                this.nextCard(this.round.items[this.currentItemNumber]);
            });
    }

    /**
     * Stop the round.
     */
    stopRound()
    {
        if(this.roundStatus !== 'end') {
            this.timerSound.pause();
            this.roundStatus = 'end';
            this.responded = true;
            this.currentItemNumber = 10;
            this.inputResponse.nativeElement.disabled = true;
            this._changeDetectorRef.markForCheck();
        }
    }

    /**
     * Start a new round without leaving round game view.
     */
    restartRound()
    {
        this.resetData();
        setTimeout(() => {
            // It was added runGuardsAndResolvers: 'always' on game.routing.ts,
            // and onSameUrlNavigation: 'reload' in app.module.ts.
            this._router.navigate([this._router.url]);
        }, 1000);
    }

    /**
     * Reset all round game data.
     */
    resetData()
    {
        this.roundStatus = 'playing';
        this.correctResponses = 0;
        this.responseTimes = [];
        this.round = {};
        this.response = '';
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Speech the sound for a word.
     * @param text
     */
    speech(text: string) {
        this.speechSynthesis.speak(text);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

}
