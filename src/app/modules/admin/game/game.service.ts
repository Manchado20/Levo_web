import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Category, Course, Round } from './game.types';
import { environment } from 'environments/environment';
import { AuthUtils } from 'app/core/auth/auth.utils';

@Injectable({
    providedIn: 'root'
})
export class GameService
{
    // Private
    private _round: BehaviorSubject<Round> = new BehaviorSubject(null);      // It contains a round game object.
    private _categories: BehaviorSubject<Category[] | null> = new BehaviorSubject(null);
    private _course: BehaviorSubject<Course | null> = new BehaviorSubject(null);
    private _courses: BehaviorSubject<Course[] | null> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    // Getter for round game.
    get round$(): Observable<Round>
    {
        return this._round.asObservable();
    }

    /**
     * Getter for categories
     */
    get categories$(): Observable<Category[]>
    {
        return this._categories.asObservable();
    }

    /**
     * Getter for courses
     */
    get courses$(): Observable<Course[]>
    {
        return this._courses.asObservable();
    }

    /**
     * Getter for course
     */
    get course$(): Observable<Course>
    {
        return this._course.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    // Fetch a round from API.
    getRound(): Observable<Round>
    {
        const payload = AuthUtils.getAccessTokenPayload(localStorage.accessToken);
        return this._httpClient.post<Round>(environment.apiURL+'/rounds', {
            area: payload.area,
            user: payload.user
        }).pipe(
            tap((response: any) => {
                this._round.next(response);
            })
        );
    }

     // Fetch a round from API.
     getRoundHangMan(): Observable<Round>
     {
         const payload = AuthUtils.getAccessTokenPayload(localStorage.accessToken);
         return this._httpClient.post<Round>(environment.apiURL+'/start_hangman', {
             area: payload.area,
             user: payload.user
         }).pipe(
             tap((response: any) => {
                 this._round.next(response);
             })
         );
     }


    /**
     * Get categories
     */
    getCategories(): Observable<Category[]>
    {
        return this._httpClient.get<Category[]>('api/apps/academy/categories').pipe(
            tap((response: any) => {
                this._categories.next(response);
            })
        );
    }

    /**
     * Get courses
     */
    getCourses(): Observable<Course[]>
    {
        return this._httpClient.get<Course[]>('api/apps/academy/courses').pipe(
            tap((response: any) => {
                this._courses.next(response);
            })
        );
    }

    /**
     * Get course by id
     */
    getCourseById(id: string): Observable<Course>
    {
        return this._httpClient.get<Course>('api/apps/academy/courses/course', {params: {id}}).pipe(
            map((course) => {

                // Update the course
                this._course.next(course);

                // Return the course
                return course;
            }),
            switchMap((course) => {

                if ( !course )
                {
                    return throwError('Could not found course with id of ' + id + '!');
                }

                return of(course);
            })
        );
    }
}
