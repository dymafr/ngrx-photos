import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';

export const AUTH_ROUTING: Routes = [
  { path: 'signup', component: SignupComponent},
  { path: 'signin', component: SigninComponent},
];
