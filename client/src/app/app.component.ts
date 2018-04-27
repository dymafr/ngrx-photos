import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from './shared/store';
import { TryRefreshToken } from './shared/store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private store: Store<State>) {
    this.store.dispatch(new TryRefreshToken());
  }
}
