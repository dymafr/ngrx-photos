import { Component, OnInit } from '@angular/core';
import { User } from '../share/models/user.model';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import { AuthState } from '../auth/redux/auth.reducers';
import { getUser } from '../auth/redux/auth.helpers';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public currentUser$: Observable<User> = this.store.pipe(
    select(getUser)
  );

  constructor(private store: Store<AuthState>) { }

  ngOnInit() {
  }

}
