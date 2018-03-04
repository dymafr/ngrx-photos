import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { LayoutModule } from '../shared/layout/layout.module';
import { AUTH_ROUTING } from './auth.routing';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';

import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';

import { authReducers } from './redux/auth.reducers';
import { AuthEffects } from './redux/auth.effects';
import { AuthInterceptor } from './interceptors/auth.interceptor';

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
