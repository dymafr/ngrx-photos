import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AuthState } from '../../../auth/redux/auth.reducers';
import { Logout } from '../../../auth/redux/auth.actions';
import { SetFilter } from '../../../photos/redux/photos.actions';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  public isLoggedIn$ = this.store.pipe(
    select('auth')
  );

  @ViewChild('filter') public el: ElementRef;

  constructor(private store: Store<AuthState>) { }

  ngOnInit() { }

  public logout(): void {
    this.store.dispatch(new Logout());
  }

  public search(): void {
    this.store.dispatch(new SetFilter(this.el.nativeElement.value));
  }


}
