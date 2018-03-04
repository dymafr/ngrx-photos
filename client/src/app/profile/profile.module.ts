import { NgModule } from '@angular/core';
import { LayoutModule } from '../shared/layout/layout.module';
import { RouterModule } from '@angular/router';
import { PROFILE_ROUTING } from './profile.routing';
import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [
    LayoutModule,
    RouterModule.forChild(PROFILE_ROUTING)
  ],
  declarations: [
    ProfileComponent
  ]
})
export class ProfileModule { }
