import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { Category, Course, Round } from '../game.types';
import { map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HangmanService {
  private _round: BehaviorSubject<Round> = new BehaviorSubject(null);      // It contains a round game object.


  constructor(private http: HttpClient) { }
  // private words: string[] = [
  //   'Rails', 'Angular', 'Bootstrap', 'Ruby', 'JavaScript',
  //   'authentication', 'function', 'array', 'object', 'sublime',
  //   'github', 'agile', 'route', 'database', 'model', 'view',
  //   'controller', 'terminal', 'array', 'data', 'inheritance',
  //   'Heroku', 'scope', 'closure'
  // ];

  private words: string[] = [
   'array', 'data', 'Angular'
  ];

  
  // Getter for round game.
  get round$(): Observable<Round>
  {
      return this._round.asObservable();
  }

  startGame(): Observable<any> {
    const payload = AuthUtils.getAccessTokenPayload(localStorage.accessToken);
        return this.http.post(environment.apiURL+'/start_hangman', {
             area: payload.area,
             user: payload.user
        }).pipe(
          tap((response: any) => {
            console.log(response, 'response');
              this._round.next(response);
          })
      );
  }

  guessLetter(letter: string): Observable<any> {
    return this.http.post(environment.apiURL + '/guess_hangman', { letter });
  }

  playHangman(data: any): Observable<any> {
    return this.http.post(environment.apiURL + '/start_hangman', data);
  }

  getRandomWord(): string {
    const index = Math.floor(Math.random() * this.words.length);
    return this.words[index];
  }

  makeLetters(word: string): { name: string, chosen: boolean }[] {
    return word.split('').map(character => ({ name: character, chosen: false }));
  }
}
