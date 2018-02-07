import { Injectable, OnDestroy } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { JwtToken } from '../models/jwt-token.model';
import { tap } from 'rxjs/operators/tap';
import { timer } from 'rxjs/observable/timer';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Injectable()
export class AuthService implements OnDestroy {
  public subscription: Subscription;

  public jwtToken: BehaviorSubject<JwtToken> = new BehaviorSubject({
    isAuthenticated: null,
    token: null
  });

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.initToken();
    this.subscription = this.initTimer();
  }

  private initTimer(): Subscription {
    if (localStorage.getItem('jwt')) {
      return timer(2000, 1000 * 5).pipe(
        switchMap( () => {
          return this.http.get('/api/auth/refresh-token');
        }),
        tap( (token: string) => {
          this.jwtToken.next({
            isAuthenticated: true,
            token: token
          });
          localStorage.setItem('jwt', token);
        })
      ).subscribe();
    }
  }

  private initToken(): void {
    const token = localStorage.getItem('jwt');
    if (token) {
      this.jwtToken.next({
        isAuthenticated: true,
        token: token
      });
    } else {
      this.jwtToken.next({
        isAuthenticated: false,
        token: null
      });
    }
  }

  public signup(user: User): Observable<User> {
    return this.http.post<User>('/api/auth/signup', user);
  }

  public signin(credentials: { email: string, password: string}): Observable<string> {
    return this.http.post<string>('/api/auth/signin', credentials).pipe(
      tap(( token: string ) => {
        this.jwtToken.next({
          isAuthenticated: true,
          token: token
        });
        localStorage.setItem('jwt', token);
        this.subscription = this.initTimer();
      })
    );
  }

  public logout(): void {
    if (this.subscription) { this.subscription.unsubscribe(); }
    this.jwtToken.next({
      isAuthenticated: false,
      token: null
    });
    localStorage.removeItem('jwt');
    this.router.navigate(['/signin']);
  }

  ngOnDestroy() {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }

}
