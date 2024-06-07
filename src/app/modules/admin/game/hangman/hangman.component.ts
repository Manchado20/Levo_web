import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HangmanService } from './hangman.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.scss']
})
export class HangmanComponent implements OnInit {
  missesAllowed = 6;
  secretWord: { name: string, chosen: boolean }[] = [];
  letters: { name: string, chosen: boolean }[] = [];
  numMisses = 0;
  win = false;
  lost = false;
  hiddenWord: any;
  roundStatus: string = 'playing';                        // Round status that can be: start, playing, end.
  constructor(private hangmanService: HangmanService, private _router: Router,  private cdr: ChangeDetectorRef ) { }

  ngOnInit(): void {
    this.startGame();
    this.letters = this.hangmanService.makeLetters("abcdefghijklmnopqrstuvwxyz");
  }

  
  startGame(): void {
    this.hangmanService.playHangman({ action: 'start' }).subscribe(response => {
      this.hiddenWord = response.items[0].word;
    });
    this.reset();
  }

  respondCard(skip: boolean) {
    this.revealSecret();
    setTimeout(() => {
      this.reset();
      console.log('ok');
    }, 2000);
  }

  stopRound()
  {
    // if(this.roundStatus !== 'end') {
    //     this.roundStatus = 'end';
    // }

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












