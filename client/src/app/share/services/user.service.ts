import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from '../models/user.model';
import { Observable } from 'rxjs/Observable';
import { tap, switchMap } from 'rxjs/operators';

@Injectable()
export class UserService {
  public currentUser: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

  public getCurrentUser(): Observable<User> {
    if (this.currentUser.value) {
      return this.currentUser;
    } else {
      return this.http.get<User>('/api/user/current').pipe(
        tap( (user: User) => {
          this.currentUser.next(user);
        }),
        switchMap( () => {
          return this.currentUser;
        })
      );
    }
  }

}
