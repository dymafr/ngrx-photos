import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Store, select } from '@ngrx/store';
import { AuthState } from '../../redux/auth.reducers';
import { TryLogin } from '../../redux/auth.actions';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  public form: FormGroup;
  public error$: Observable<string> = this.store.pipe(
    select('auth'),
    map( (state: AuthState) => {
      return state.error;
    })
  );

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private store: Store<AuthState>,
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
