import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AuthState } from '../../../auth/redux/auth.reducers';
import { Logout } from '../../../auth/redux/auth.actions';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  public isLoggedIn$ = this.store.pipe(
    select('auth')
  );

  constructor(private store: Store<AuthState>) { }

  ngOnInit() { }

  public logout(): void {
    this.store.dispatch(new Logout());
  }


}
