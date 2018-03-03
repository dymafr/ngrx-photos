
// modules natifs
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { LayoutModule } from './share/layout/layout.module';
import { AuthModule } from './auth/auth.module';
import { AppComponent } from './app.component';
import { APP_ROUTING } from './app.routing';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { rootReducers } from './app.reducers';
import { AppEffects } from './app.effects';
import { metaReducers } from './app.reducers';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    AuthModule,
    RouterModule.forRoot(APP_ROUTING),
    StoreModule.forRoot(rootReducers, { metaReducers }),
    EffectsModule.forRoot([AppEffects]),
    // StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      name: 'Ngrx Photos !',
      logOnly: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
