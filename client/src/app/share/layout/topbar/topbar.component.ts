import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { JwtToken } from '../../models/jwt-token.model';
import { Subscription } from 'rxjs/Subscription';
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
