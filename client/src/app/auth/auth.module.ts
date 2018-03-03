import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '../share/layout/layout.module';

import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';

import { AUTH_ROUTING } from './auth.routing';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authReducers } from './auth.reducers';
import { AuthEffects } from './auth.effects';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';

@NgModule({
  imports: [
    LayoutModule,
    ReactiveFormsModule,
    RouterModule.forChild(AUTH_ROUTING),
    StoreModule.forFeature('auth', authReducers),
    EffectsModule.forFeature([AuthEffects])
  ],
  declarations: [
    SignupComponent,
    SigninComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthService,
    AuthGuard,
  ]
})
export class AuthModule {}
