import { FetchUser } from './../shared/store/actions/auth.actions';
import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user.model';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { currentUserSelector } from '../shared/store/selectors';
import { State } from '../shared/store';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public currentUser$: Observable<User> = this.store.pipe(
    select(currentUserSelector)
  );

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.store.dispatch(new FetchUser());
  }

}
