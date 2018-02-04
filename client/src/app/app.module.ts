
// modules natifs
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// modules
import { LayoutModule } from './share/layout/layout.module';

// components
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { TopbarComponent } from './share/components/topbar/topbar.component';
import { ProfileComponent } from './profile/profile.component';

// routing
import { APP_ROUTING } from './app.routing';

// services
import { AuthService } from './share/services/auth.service';
import { UserService } from './share/services/user.service';

// guards
import { AuthGuard } from './share/guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    SignupComponent,
    SigninComponent,
    TopbarComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    RouterModule.forRoot(APP_ROUTING),
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    UserService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
