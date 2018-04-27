import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { authErrorSelector } from '../../shared/store/selectors';
import { State } from '../../shared/store';
import { TryRegister } from '../../shared/store/actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public form: FormGroup;
  public error$: Observable<string> = this.store.pipe(select(authErrorSelector));

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<State>
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
