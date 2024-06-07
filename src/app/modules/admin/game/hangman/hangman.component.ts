import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { HangmanService } from './hangman.service';
import { Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import { interval, Subscription, Subject } from 'rxjs';
import { TimerSound } from '../../../../lib/sound/timersound';
import { FlipSound } from 'app/lib/sound/flipsound';

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
  private timerSubscription: Subscription;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  private isComponentActive: boolean = true;

  constructor(private hangmanService: HangmanService, private _router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.timerSound = new TimerSound();
    this.flipSound = new FlipSound();
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
    this.hangmanService.playHangman({ action: 'start' }).subscribe(response => {
      this.hiddenWord = response.items[0].word;
    });
    this.reset();
  }

  respondCard(skip: boolean): void {
    this.revealSecret();
    setTimeout(() => {
      this.reset();
      console.log('ok');
    }, 2000);
  }

  stopRound(): void {
    if (this.timerSound) {
      this.timerSound.pause();
    }
    this._router.navigateByUrl('/practicar');
  }

  reset(): void {
    console.log('reset');

    this.secretWord = this.hangmanService.makeLetters(this.hangmanService.getRandomWord());
    console.log(this.secretWord, ' this.secretWord');
    this.numMisses = 0;
    this.win = false;
    this.lost = false;
    this.letters.forEach(letter => letter.chosen = false);

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

      if (this.progressBarValue == 0) {
        console.log('destruto');
      }
      if (sec === seconds) {
        this.timerSubscription.unsubscribe();
        this.progressBarValue = 100;
        this.progressBarColor = "primary";
        this.timerSound.pause();
        this.respondCard(true);
      }
      console.log('termino 0');
      this.cdr.markForCheck();
    });
    this.cdr.detectChanges(); // Force change detection
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
    if (!this.win && this.numMisses === this.missesAllowed) {
      this.lost = true;
      this.revealSecret();
    }
  }

  private revealSecret(): void {
    this.secretWord.forEach(letter => letter.chosen = true);
  }
}
