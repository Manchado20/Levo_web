import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpHeaders,
    HttpErrorResponse,
  } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { AuthUtils } from 'app/core/auth/auth.utils';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Accept': '*/*',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
      'Connection': 'keep-alive',
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36',
      'X-Requested-With': 'XMLHttpRequest',
      'Content-type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Headers' : '*'
    })
};

@Injectable({
    providedIn: 'root'
})
export class WordsService
{
    httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    private _data: BehaviorSubject<any> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for data
     */
    get data$(): Observable<any>
    {
        return this._data.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get data
     */
    getData(): Observable<any>
    {
        const payload = AuthUtils.getAccessTokenPayload(localStorage.accessToken);
        return this._httpClient.get(environment.apiURL+'/dashboard').pipe(
            tap((response: any) => {
                this._data.next(response);
            })
        );
    }

    GetWords(selectTextBook: string, url_category: string, numBooksValue: number, numPagesValue: number) {
        let headers = new HttpHeaders()
        headers=headers.append('content-type','application/json')
        headers=headers.append('Access-Control-Allow-Origin', '*')
        headers=headers.append('content-type','application/x-www-form-urlencoded')
        headers=headers.append('customer-header', 'custom')
        const url = `https://levoalgoritmo.manchados.site/extracted-words?category=${selectTextBook}&url_category=${url_category}&num_book=${numBooksValue}&num_page=${numPagesValue}`;
        return this._httpClient.get(url, { headers: headers });   
     }


    saveConfigWords(categoria: string, num_libros: number, num_paginas: number, user: string): Observable<any>
    {
        let data = {
            "categoria" : categoria,
            "num_libros" : num_libros,
            "num_paginas" : num_paginas,
            "user" : user,
        };
        return this._httpClient.post(environment.apiURL+'/save-config-words', data);
    }

    saveWords(wordsData: any) { 
        let data = {
            "wordsData" : wordsData,
        };
        
        return this._httpClient.post(environment.apiURL+'/save-words', data);
    }

    getConfigWords(user: string): Observable<any>
    {
        let data = {
            "user" : user,
        };
        
        return this._httpClient.post(environment.apiURL+'/get-config-words', data);
    }

    
}
