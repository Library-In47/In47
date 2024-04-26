import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanMatch,
  Route,
  UrlSegment,
  UrlTree,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanMatch, CanActivate {
  constructor(private servicio: AuthService, private router: Router) {}

  private checkAuthStatus(): boolean | Observable<boolean> {
    return this.servicio.checkAuth().pipe(
      tap((userAuthenticated) =>
        console.log('Authenticated:', userAuthenticated)
      ),
      tap((userAuthenticated) => {
        if (!userAuthenticated) {
          this.router.navigate(['']);
        }
      })
    );
  }

  canMatch(
    route: Route,
    segments: UrlSegment[]
  ): boolean | Observable<boolean> {
    console.log('Can Match');
    console.log({ route, segments });
    return this.checkAuthStatus();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> {
    console.log('Can Activate');
    console.log({ route, state });

    return this.checkAuthStatus();
  }
}
