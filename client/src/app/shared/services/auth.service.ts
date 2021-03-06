import { Injectable  } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { timer } from 'rxjs/observable/timer';
import { Store } from '@ngrx/store';
import { AuthState } from '../store/reducers';
import { TryRefreshToken } from '../store/actions';

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient,
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
