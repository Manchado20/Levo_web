import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category, Course, Round } from './game.types';
import { GameService } from './game.service';

@Injectable({
    providedIn: 'root'
})
export class GameCategoriesResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _gameService: GameService)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category[]>
    {
        return this._gameService.getCategories();
    }
}

@Injectable({
    providedIn: 'root'
})
export class GamesResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _gameService: GameService)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course[]>
    {
        return this._gameService.getCourses();
    }
}

@Injectable({
    providedIn: 'root'
})
export class GameResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _router: Router,
        private _gameService: GameService
    )
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course>
    {
        return this._gameService.getCourseById(route.paramMap.get('id'))
                   .pipe(
                       // Error here means the requested task is not available
                       catchError((error) => {

                           // Log the error
                           console.error(error);

                           // Get the parent url
                           const parentUrl = state.url.split('/').slice(0, -1).join('/');

                           // Navigate to there
                           this._router.navigateByUrl(parentUrl);

                           // Throw an error
                           return throwError(error);
                       })
                   );
    }
}

@Injectable({
    providedIn: 'root'
})
export class RoundResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _gameService: GameService)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Round>
    {
        return this._gameService.getRound();
    }
}

@Injectable({
    providedIn: 'root'
})
export class RoundHangMan implements Resolve<any>
{
    constructor(private _gameService: GameService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Round> {
        return this._gameService.getRoundHangMan();
    }
}


