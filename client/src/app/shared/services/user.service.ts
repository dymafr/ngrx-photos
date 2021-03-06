import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user.model';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  public getCurrentUser(): Observable<User> {
    return this.http.get<User>('api/user/current');
  }

}
