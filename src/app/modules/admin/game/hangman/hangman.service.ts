import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { AuthUtils } from 'app/core/auth/auth.utils';

@Injectable({
  providedIn: 'root'
})
export class HangmanService {


  constructor(private http: HttpClient) { }
  private words: string[] = [
    'Rails', 'Angular', 'Bootstrap', 'Ruby', 'JavaScript',
    'authentication', 'function', 'array', 'object', 'sublime',
    'github', 'agile', 'route', 'database', 'model', 'view',
    'controller', 'terminal', 'array', 'data', 'inheritance',
    'Heroku', 'scope', 'closure'
  ];

  startGame(): Observable<any> {
    const payload = AuthUtils.getAccessTokenPayload(localStorage.accessToken);
        return this.http.post(environment.apiURL+'/start_hangman', {
             area: payload.area,
             user: payload.user
        });
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
