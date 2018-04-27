import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Store, select } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { isLoggedinSelector } from '../store/selectors';
import { State } from '../store';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private store: Store<State>
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this.store.pipe(
        select(isLoggedinSelector),
        take(1)
      );

  }
}
