import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../../shared/models/user.model';
import { Router } from '@angular/router';
import { AuthState } from '../../redux/auth.reducers';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { TryRegister } from '../../redux/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public form: FormGroup;
  public error$: Observable<string> = this.store.pipe(
    select('auth'),
    map( (state: AuthState) => state.error)
  );

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AuthState>
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: [''],
      name: [''],
      password: ['']
    });
  }

  public submit(): void {
    this.store.dispatch(new TryRegister(this.form.value));
  }

}
