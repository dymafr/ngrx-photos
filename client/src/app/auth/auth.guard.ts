import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { JwtToken } from '../share/models/jwt-token.model';
import { map } from 'rxjs/operators/map';
import { AuthState } from './auth.reducers';
import { Store, select } from '@ngrx/store';
import { take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private store: Store<AuthState>
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this.store.pipe(
        select('auth'),
        take(1),
        map( (storeState: AuthState) => storeState.isLoggedin )
      );

  }
}
