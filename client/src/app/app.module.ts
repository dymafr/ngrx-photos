// modules natifs
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from './shared/modules/core.module';

// components
import { AppComponent } from './app.component';

// routing
import { APP_ROUTING } from './app.routing';
import { UserService } from './shared/services/user.service';

// ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducersMap } from './shared/store';
import { AuthEffects } from './shared/store/effects/auth.effects';

// others
import { environment } from '../environments/environment';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(APP_ROUTING),
    StoreModule.forRoot(reducersMap),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({
      name: 'Ngrx Photos !',
      logOnly: environment.production,
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
