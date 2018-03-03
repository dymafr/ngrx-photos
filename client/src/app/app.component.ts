import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Store } from '@ngrx/store';
import { AuthState } from './auth/auth.reducers';
import { InitAuthState } from './auth/auth.actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private store: Store<AuthState>) {
    this.store.dispatch(new InitAuthState());
  }
}
