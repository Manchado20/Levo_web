import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { environment } from 'environments/environment';

@Injectable()
export class AuthService
{
    private _authenticated: boolean = false;
    private _isAdmin: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string)
    {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string
    {
        return localStorage.getItem('accessToken') ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any>
    {
        return this._httpClient.post(environment.apiURL+'/forgot', {email: email});
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any>
    {
        return this._httpClient.post(environment.apiURL+'/reset', {password: password});
    }

    /**
     * Reset password
     *
     * @param password
     */
     reassignPassword(password: string, token: string): Observable<any>
     {
         return this._httpClient.post(environment.apiURL+'/reassign', {password: password, token: token});
     }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string }): Observable<any>
    {
        // Throw error, if the user is already logged in
        if ( this._authenticated )
        {
            return throwError('User is already logged in.');
        }

        return this._httpClient.post(environment.apiURL+'/login', credentials).pipe(
            switchMap((response: any) => {
                console.log(response, ' responseee');
                // Store the access token in the local storage
                let data = response.data;
                this.accessToken = data.accessToken;

                // Set the authenticated flag to true
                this._authenticated = true;

                //Set value is session Admin
                this._isAdmin = data.isAdmin;
                sessionStorage.setItem('isAdmin',  this._isAdmin.toString());
                // Store the user on the user service
                this._userService.user = data.user;

                // Return a new observable with the response
                return of(data);
            })
        );
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any>
    {
        // Renew token
        return this._httpClient.post('api/auth/refresh-access-token', {
            accessToken: this.accessToken
        }).pipe(
            catchError(() =>

                // Return false
                of(false)
            ),
            switchMap((response: any) => {

                // Store the access token in the local storage
                this.accessToken = response.accessToken;

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;

                // Return true
                return of(true);
            })
        );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any>
    {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { name: string; email: string; password: string; company: string }): Observable<any>
    {
        // return this._httpClient.post('api/auth/sign-up', user);
        return this._httpClient.post(environment.apiURL+'/sign-up', user);

    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean>
    {

        if(!AuthUtils.isValidAccessToken(this.accessToken)) {
            this._authenticated = false;
            return of(false);
        }

        // Check if the user is logged in
        if ( this._authenticated )
        {
            return of(true);
        }

        // Check the access token expire date
        if ( AuthUtils.isTokenExpired(this.accessToken) )
        {
            return of(false);
        }

        return of(true);

        // If the access token exists and it didn't expire, sign in using it
        //return this.signInUsingToken();
    }
}
