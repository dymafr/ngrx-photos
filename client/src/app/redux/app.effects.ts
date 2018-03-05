import { Effect, ofType, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { map, switchMap, catchError } from 'rxjs/operators';
import { parseUrl } from './app.helpers';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/models/user.model';
import { SetCurrentUser } from '../auth/redux/auth.actions';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';
import { SET_FILTER, SearchPhotos } from '../photos/redux/photos.actions';

@Injectable()
export class AppEffects {
  @Effect()
  routerAction$ = this.actions$.pipe(
    ofType(ROUTER_NAVIGATION),
    map(parseUrl),
    switchMap((url: string) => {
      if (url === '/profile') {
        return this.userService.getCurrentUser().pipe(
          map((user: User) => {
            return new SetCurrentUser(user);
          }),
          catchError(err => {
            console.log('err : ', err);
            return empty();
          })
        );
      } else if (url === '/photos') {
        return of(new SearchPhotos());
      } else {
        return empty();
      }
    })
  );

  @Effect()
  setFilter$ = this.actions$.pipe(
    ofType(SET_FILTER),
    map(() => {
      return new SearchPhotos();
    })
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
  ) { }

}
