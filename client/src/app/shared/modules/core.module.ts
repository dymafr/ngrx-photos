import { RouterModule } from '@angular/router';
import { LayoutModule } from './layout.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { PageNotFoundComponent } from './../components/page-not-found/page-not-found.component';
import { TopbarComponent } from './../components/topbar/topbar.component';
import { SigninComponent } from './../../components/signin/signin.component';
import { SignupComponent } from './../../components/signup/signup.component';

import { PhotosService } from './../services/photos.service';
import { AuthService } from './../services/auth.service';
import { UserService } from './../services/user.service';

import { AuthGuard } from './../guards/auth.guard';
import { AuthInterceptor } from './../interceptors/auth.interceptor';

const COMPONENTS = [
  TopbarComponent,
  PageNotFoundComponent,
  SigninComponent,
  SignupComponent
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    LayoutModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: [
    UserService,
    AuthService,
    PhotosService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthGuard
  ]
})
export class CoreModule { }
