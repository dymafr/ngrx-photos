import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from '@ngrx/effects';
import { AuthService } from "./auth.service";
import { Router } from '@angular/router';
import * as AuthActions from './auth.actions';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { User } from "../share/models/user.model";
import { of } from 'rxjs/observable/of';
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class AuthEffects {
  @Effect()
  tryLogin$ = this.actions$.pipe(
    ofType(AuthActions.TRY_LOGIN),
    map((action: AuthActions.TryLogin) => action.payload),
    switchMap( (auth: { email: string, password: string}) => {
      return this.authService.signin(auth).pipe(
        map( (res: { token: string, user: User }) => {
          return new AuthActions.LoginSuccess(res);
        }),
        catchError( (err: HttpErrorResponse) => {
          return of(new AuthActions.LoginError(err.error));
        })
      );
    })
  );

  @Effect()
  TryRegister$ = this.actions$.pipe(
    ofType(AuthActions.TRY_REGISTER),
    map( (action: AuthActions.TryRegister) => action.payload),
    switchMap( (auth: { email: string, name: string, password: string }) => {
      return this.authService.signup(auth).pipe(
        map( () => new AuthActions.RegisterSuccess()),
        catchError( err => {
          return of(new AuthActions.RegisterError(err.error));
        })
      );
    })
  );

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.pipe(
    ofType(AuthActions.LOGIN_SUCCESS),
    tap(() => this.router.navigate(['/']))
  );

  @Effect({ dispatch: false })
  registerSuccess$ = this.actions$.pipe(
    ofType(AuthActions.REGISTER_SUCCESS),
    tap( () => this.router.navigate(['/auth/signin']))
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap( () => this.router.navigate(['/']))
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}

}

