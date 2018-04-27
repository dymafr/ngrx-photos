import { authErrorSelector } from './../../shared/store/selectors/auth.selectors';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { State } from '../../shared/store';
import { TryLogin } from '../../shared/store/actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  public form: FormGroup;
  public error$: Observable<string> = this.store.pipe(select(authErrorSelector));

  constructor(
    private fb: FormBuilder,
    private store: Store<State>,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  public submit(): void {
    this.store.dispatch(new TryLogin(this.form.value));
  }


}
