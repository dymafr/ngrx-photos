import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { Store } from '@ngrx/store';
import { AuthState } from './auth/redux/auth.reducers';
import { TryRefreshToken } from './auth/redux/auth.actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private store: Store<AuthState>) {
    this.store.dispatch(new TryRefreshToken());
  }
}
