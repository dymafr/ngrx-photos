import { UserService } from './../../services/user.service';
import { FETCH_USER, FetchUser } from './../actions/auth.actions';
import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { HttpErrorResponse } from "@angular/common/http";
import { Subscription } from "rxjs/Subscription";
import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT,
  TRY_REFRESH_TOKEN,
  SetToken,
  TRY_LOGIN,
  TryLogin,
  LoginSuccess,
  LoginError,
  TRY_REGISTER,
  TryRegister,
  RegisterSuccess,
  SetCurrentUser,
  RegisterError } from '../actions';
import { AuthService } from "../../services/auth.service";
import { User } from '../../models/user.model';
import { empty } from 'rxjs/observable/empty';

@Injectable()
export class AuthEffects {
  private subscription: Subscription = new Subscription();

  @Effect()
  tryRefreshToken$ = this.actions$.pipe(
    ofType(TRY_REFRESH_TOKEN),
    switchMap( () => {
      const token = localStorage.getItem('token');
      if (token) {
        return this.authService.refreshToken(token).pipe(
          map( (newToken: string) => {
            return new SetToken(newToken);
          }),
          catchError( err => {
            localStorage.removeItem('token');
            console.log('err : ', err);
            return of();
          })
        );
      } else {
        return of();
      }
    })
  );

  @Effect()
  tryLogin$ = this.actions$.pipe(
    ofType(TRY_LOGIN),
    map((action: TryLogin) => action.payload),
    switchMap( (auth: { email: string, password: string}) => {
      return this.authService.signin(auth).pipe(
        map( (token: string) => {
          localStorage.setItem('token', token);
          return new LoginSuccess(token);
        }),
        catchError( (err: HttpErrorResponse) => {
          return of(new LoginError(err.error));
        })
      );
    })
  );

  @Effect()
  tryRegister$ = this.actions$.pipe(
    ofType(TRY_REGISTER),
    map( (action: TryRegister) => action.payload),
    switchMap( (auth: { email: string, name: string, password: string }) => {
      return this.authService.signup(auth).pipe(
        map( () => new RegisterSuccess()),
        catchError( err => {
          return of(new RegisterError(err.error));
        })
      );
    })
  );

  @Effect()
  loginSuccess$ = this.actions$.pipe(
    ofType(LOGIN_SUCCESS),
    tap(() => {
      this.subscription.add(this.authService.initTimer().subscribe());
      this.router.navigate(['/']);
    }),
    map( () => new FetchUser())
  );

  @Effect({ dispatch: false })
  registerSuccess$ = this.actions$.pipe(
    ofType(REGISTER_SUCCESS),
    tap( () => this.router.navigate(['/signin']))
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType(LOGOUT),
    tap( () => {
      localStorage.removeItem('token');
      this.subscription.unsubscribe();
      this.router.navigate(['/']);
    })
  );

  @Effect()
  fetchUser$ = this.actions$.pipe(
    ofType(FETCH_USER),
    switchMap( () => this.userService.getCurrentUser()),
    map( (user: User) => new SetCurrentUser(user)),
    catchError( () => {
      console.log('error fetch user');
      return empty();
    })
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
  ) {}

}

