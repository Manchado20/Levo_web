import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { WordsService } from './words.service';

@Injectable({
    providedIn: 'root'
})
export class WordsResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _homeService: WordsService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {
        return this._homeService.getData();
    }
}
