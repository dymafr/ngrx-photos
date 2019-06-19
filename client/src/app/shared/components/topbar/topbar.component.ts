import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from '../../store';
import { Logout } from '../../store/actions';
import { SetFilter, SearchPhotos } from '../../../photos/shared/store/actions';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  public isLoggedIn$ = this.store.pipe(
    select('auth')
  );

  @ViewChild('filter', {static: false}) public el: ElementRef;

  constructor(private store: Store<State>) { }

  ngOnInit() { }

  public logout(): void {
    this.store.dispatch(new Logout());
  }

  public search(): void {
    console.log(this.el.nativeElement.value)
    this.store.dispatch(new SetFilter(this.el.nativeElement.value));
    this.store.dispatch(new SearchPhotos());
  }


}
