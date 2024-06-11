import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from 'app/core/auth/auth.service';
import { switchMap } from 'rxjs/operators';
import { AuthUtils } from '../auth.utils';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad
{
    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _router: Router
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Can activate
     *
     * @param route
     * @param state
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
    {
        const redirectUrl = state.url === '/cerrar-sesion' ? '/' : state.url;
        return this._check(redirectUrl, route);
    }

    /**
     * Can activate child
     *
     * @param childRoute
     * @param state
     */
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
        const redirectUrl = state.url === '/cerrar-sesion' ? '/' : state.url;
        return this._check(redirectUrl, childRoute);
    }

    /**
     * Can load
     *
     * @param route
     * @param segments
     */
    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean
    {
        const fullPath = segments.map(segment => segment.path).join('/');
        return this._check(fullPath, route);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Check the authenticated status
     *
     * @param redirectURL
     * @param route

     * @private
     */
    private _check(redirectURL: string, route?: ActivatedRouteSnapshot | Route): Observable<boolean>
    {
        // Check the authentication status
        return this._authService.check()
                   .pipe(
                       switchMap((authenticated) => {

                           // If the user is not authenticated...
                           if ( !authenticated )
                           {
                               // Redirect to the sign-in page
                               this._router.navigate(['iniciar-sesion'], {queryParams: {redirectURL}});

                               // Prevent the access
                               return of(false);
                           }

                              // Additional check for idadmin
                            const idAdmin = sessionStorage.getItem('isAdmin');
                            const path = (route instanceof ActivatedRouteSnapshot) 
                            ? route.routeConfig?.path 
                            : route?.path;

                            if (idAdmin === '0' && path === 'home') {
                                // Redirect to a safe route
                                this._router.navigate(['inicio']);

                                // Prevent the access
                                return of(false);
                            }

                           // Allow the access
                           return of(true);
                       })
                   );
    }
}
