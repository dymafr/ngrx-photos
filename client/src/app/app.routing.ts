import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { Route } from '@angular/router';

export const APP_ROUTING: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'photos'
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'photos',
    loadChildren: 'app/photos/photos.module#PhotosModule'
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadChildren: 'app/profile/profile.module#ProfileModule'
  },
  {
    path: '**', component: PageNotFoundComponent
  }
];
