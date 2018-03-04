import { Injectable  } from '@angular/core';
import { User } from '../../share/models/user.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { JwtToken } from '../../share/models/jwt-token.model';
import { tap } from 'rxjs/operators/tap';
import { switchMap, map } from 'rxjs/operators';
import { timer } from 'rxjs/observable/timer';
import { of } from 'rxjs/observable/of';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '../redux/auth.reducers';
import { TryRefreshToken } from '../redux/auth.actions';

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<AuthState>
  ) {
  }

  public initTimer() {
    return timer(500000).pipe(
      map(() => {
        return this.store.dispatch(new TryRefreshToken());
      })
    );
  }

  public signup(user: User): Observable<User> {
    return this.http.post<User>('/api/auth/signup', user);
  }

  public signin(credentials: { email: string, password: string}): Observable<string> {
    return this.http.post<string>('/api/auth/signin', credentials);
  }

  public refreshToken(token?: string): Observable<string> {
    const url = (token) ? `/api/auth/refresh-token?token=${ token }` : '/api/auth/refresh-token';
    return this.http.get<string>(url);
  }

}
