import { Effect, ofType, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { tap, map, switchMap, catchError } from 'rxjs/operators';
import { parseUrl } from './app.helpers';
import { UserService } from '../share/services/user.service';
import { User } from '../share/models/user.model';
import { SetCurrentUser } from '../auth/redux/auth.actions';
import { of } from 'rxjs/observable/of';

@Injectable()
export class AppEffects {
  @Effect()
  routerAction$ = this.actions$.pipe(
    ofType(ROUTER_NAVIGATION),
    map(parseUrl),
    switchMap( (url: string) => {
      if (url === '/profile') {
        return this.userService.getCurrentUser().pipe(
          map( (user: User) => {
            return new SetCurrentUser(user);
          }),
          catchError( err => {
            console.log('err : ', err);
            return of();
          })
        );
      } else {
        return of();
      }
    })
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
  ) {}

}
