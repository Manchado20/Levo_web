import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { HangmanService } from './hangman.service';
import { Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import { interval, Subscription, Subject } from 'rxjs';
import { TimerSound } from '../../../../lib/sound/timersound';
import { FlipSound } from 'app/lib/sound/flipsound';
import { Round, RoundItem } from '../game.types';
import { CorrectSound } from 'app/lib/sound/correctsound';
import { IncorrectSound } from 'app/lib/sound/incorrectsound';
import { catchError, switchMap, takeUntil } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.scss']
})
export class HangmanComponent implements OnInit, OnDestroy {
  missesAllowed = 6;
  secretWord: { name: string, chosen: boolean }[] = [];
  letters: { name: string, chosen: boolean }[] = [];
  numMisses = 0;
  win = false;
  lost = false;
  hiddenWord: any;
  roundStatus: string = 'playing';                        // Round status that can be: start, playing, end.
  progressBarTime: number = 15;                           // Time for responding every card in round game (in seconds).
  progressBarValue: number = 100;                         // Remaining time for the user to answer, it goes from 100 to 0.
  progressBarColor: ThemePalette = "primary";             // Top progress bar color, for indicating a warning on little remaining time.
  timerSound: TimerSound;
  flipSound: FlipSound;
  currentItemNumber: number;                              // Index of the current round item.
  currentItem: RoundItem = {};         
  correctResponses: number = 0;                           // Number of correct responses.
  round: Round;                                           // Round game.
  correctSound: CorrectSound;
  incorrectSound: IncorrectSound
  responded: boolean;                                     // Flag for indicating if user has responded a flashcard.
  responseTimes: number[] = [];                           // Array of all response times of every card.
  averageResponseTime: string = '0';                      // Average response time in whole round.
  response: string = '';                                  // Response given by user.
  word: any;
  example_word: string = "";
  loser: boolean = false
  correctResponse: number = 0;                           // Number of correct responses.

  data_word:any = [];
  private timerSubscription: Subscription;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  private isComponentActive: boolean = true;

  constructor(private hangmanService: HangmanService, private _router: Router, private cdr: ChangeDetectorRef,         private _httpClient: HttpClient,
  ) { }

  ngOnInit(): void {
    this.timerSound = new TimerSound();
    this.flipSound = new FlipSound();
    this.correctSound = new CorrectSound();
    this.incorrectSound = new IncorrectSound();
    this.startGame();
    this.letters = this.hangmanService.makeLetters("abcdefghijklmnopqrstuvwxyz");
  }

  ngOnDestroy(): void {
    this.isComponentActive = false;
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    if (this.timerSound) {
      this.timerSound.destroy();
    }
    if (this.flipSound) {
      this.flipSound.destroy();
    }
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  startGame(): void {
    this.hangmanService.startGame().subscribe((round: Round) => {
      // this.hiddenWord = response.items[0].word;
      this.round = round;
      this.currentItemNumber = 0;
      this.data_word = this.round.items;
      this.reset(this.currentItemNumber, this.data_word);
      // this.nextWord(this.round.items[this.currentItemNumber]);
    });
    // this.hangmanService.round$
    //     .pipe(takeUntil(this._unsubscribeAll))
    //     .subscribe((round: Round) => {
    //       this.round = round;
    //       this.currentItemNumber = 0;
    //       console.log(this.round);
    //       // this.nextWord(this.round.items[this.currentItemNumber]);
    //     });
  }

  respondCard(skip: boolean): void {
    let correctResponse = false;
    this.currentItemNumber++;
    if(!this.correctResponse) {
      this.incorrectSound.play();
      this.loser = true;
    }
    this.revealSecret();
    this.timerSubscription.unsubscribe();
    this.progressBarValue = 100;
    this.progressBarColor = "primary";
    this.timerSound.pause();

    setTimeout(() => {
      if(this.currentItemNumber === 3) {
          console.log('terminoi juego ahi');
          this.roundStatus = 'end';
          this.stopRound();
          return;
      }
      this.currentItem.translation = "";
      this.cdr.markForCheck();
      this.response = "";

        
      // Sends user response for saving in database.
      let userResponse = {
        round: this.round._id,
        correct: this.correctResponse,
        time: this.progressBarValue < 100 ? this.progressBarTime - ((this.progressBarTime * this.progressBarValue)/100) : 0,
        word: this.word.word,
        type: 'Sustantivo',
        translation: this.currentItem.translation
      };

      console.log(userResponse, ' userResponse');
      this._httpClient.post(environment.apiURL+'/response', userResponse).toPromise()
        .then((response: any) => {
            /* console.log(response); */
        }).catch((error: any) => {
            console.log(error);
        })


      setTimeout(() => {
        this.reset(this.currentItemNumber, this.data_word);
        this.loser = false;
      }, 200);
  }, 3000);
  }

  stopRound(): void {
    this.timerSubscription.unsubscribe();
    this.timerSound.pause();
    this.roundStatus = 'end';
    // this.responded = true;
    this.currentItemNumber = 3;
    this.cdr.detectChanges();
    setTimeout(() => {
      this.cdr.markForCheck();
    }, 100);
  
    // if (this.timerSound) {
    //   this.timerSound.pause();
    // }
    // this._router.navigateByUrl('/practicar');
  }

  getRandomWord(words) {
    console.log(words, '  wordsssssss');
    if (words.length === 0) {
        return null; // No hay más palabras disponibles
    }
    const randomIndex = Math.floor(Math.random() * words.length);
    const selectedWord = words[randomIndex];
    words.splice(randomIndex, 1); // Elimina la palabra seleccionada del array
    return selectedWord;
  }

  reset(itemNumber?, data?): void {
    this.responded = false;
    this.word = this.getRandomWord(data);
    this.correctResponse = 0;
    // this.secretWord = this.hangmanService.makeLetters(this.hangmanService.getRandomWord());
    this.secretWord = this.word.word.split('').map(letter => ({ name: letter, chosen: false }));
    this.example_word = this.word.example;
    this.numMisses = 0;
    this.win = false;
    this.lost = false;
    this.letters.forEach(letter => letter.chosen = false);

    let correctResponse = false;

    this.progressBarColor = "primary";
    const timer = interval(10);
    const seconds = this.progressBarTime * 100;
    this.timerSubscription = timer.subscribe((sec) => {
      if (!this.isComponentActive) {
        this.timerSubscription.unsubscribe();
        return;
      }

      this.progressBarValue = 100 - sec * 100 / seconds;
      if (this.progressBarValue <= 30) {
        this.progressBarColor = "warn";
        if (this.progressBarValue == 25) {
          this.timerSound.play();
        }
      }

      if (sec === seconds || this.responded === true) {
        this.timerSubscription.unsubscribe();
        this.progressBarValue = 100;
        this.progressBarColor = "primary";
        this.timerSound.pause();
        this.respondCard(true);
      }
      this.cdr.markForCheck();

      if (this.win) {
        if (!this.responded) {
          this.progressBarValue = 100;
          this.progressBarColor = "primary";
          this.responded = true;
          this.timerSound.pause();
          this.correctSound.play();
          this.correctResponses += 1;
          this.correctResponse = 1;
        }
        this.timerSubscription.unsubscribe();

         // Sends user response for saving in database.
        let userResponse = {
          round: this.round._id,
          correct: this.correctResponse,
          time: this.progressBarValue < 100 ? this.progressBarTime - ((this.progressBarTime * this.progressBarValue)/100) : 0,
          word: this.word.word,
          type: 'Sustantivo',
          translation: this.currentItem.translation
        };

        console.log(userResponse, ' userResponse');
        this._httpClient.post(environment.apiURL+'/response', userResponse).toPromise()
          .then((response: any) => {
              /* console.log(response); */
          }).catch((error: any) => {
              console.log(error);
          })
          setTimeout(() => {
            this.reset(itemNumber, this.data_word);
            // this.nextWord(this.round.items[this.currentItemNumber]);
          }, 3000);
        }
      
    });
    this.cdr.detectChanges(); // Force change detection

  }

   /**
     * Take a new word for showing a flashcard.
     * @param item
     */
   nextWord(item: RoundItem)
   {
       this.currentItem = item;
       this.responded = false;
       this.progressBarColor = "primary";
       const timer = interval(10);
       const seconds = this.progressBarTime * 100;
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
               if(this.currentItemNumber < 4) {
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
               }
           }
           this.cdr.markForCheck();
       });
   }

  try(guess: { name: string, chosen: boolean }): void {
    guess.chosen = true;
    let found = false;
    this.secretWord.forEach(letter => {
      if (guess.name.toUpperCase() === letter.name.toUpperCase()) {
        letter.chosen = true;
        found = true;
      }
    });
    if (!found) {
      this.numMisses++;
    }
    this.checkForEndOfGame();
  }

  private checkForEndOfGame(): void {
    this.win = this.secretWord.every(letter => letter.chosen);
    // Validate given response by user against correct translation.
    if (!this.win && this.numMisses === this.missesAllowed) {
      this.lost = true;
      this.revealSecret();
      this.incorrectSound.play();
      this.timerSubscription.unsubscribe();
      this.progressBarValue = 100;
      this.progressBarColor = "primary";
      // this.correctResponse = 0;
         
      setTimeout(() => {
        this.loser = false;
        this.reset(1, this.data_word);      
      }, 2000);
    }  
    
    // if(this.win) {
    //   this.progressBarValue = 100;
    //   this.progressBarColor = "primary";
    //   if(this.responded === false) {
    //     this.responded = true;
    //   }
    //   this.timerSound.pause();
    //   this.correctSound.play();
    //   this.correctResponses += 1;
    //   correctResponse = true;
    // }

    // console.log(this.correctResponses);

    // // Sends user response for saving in database.
    // let userResponse = {
    //     round: this.round._id,
    //     correct: correctResponse,
    //     time: this.progressBarValue < 100 ? this.progressBarTime - ((this.progressBarTime * this.progressBarValue)/100) : 0,
    //     word: this.currentItem.word,
    //     type: this.currentItem.type,
    //     translation: this.currentItem.translation
    // };

    // console.log(userResponse, ' userResponse');
  }

  private revealSecret(): void {
    this.secretWord.forEach(letter => letter.chosen = true);
  }

   /**
     * Start a new round without leaving round game view.
     */
   restartRound()
   {
     this.resetData()
     setTimeout(() => {
      this._router.navigate([this._router.url]);
      this.startGame();
    }, 800);
   }

   resetData()
   {
       this.roundStatus = 'playing';
       this.correctResponses = 0;
       this.responseTimes = [];
       this.round = {};
       this.response = '';
       this.cdr.markForCheck();
   }

}
