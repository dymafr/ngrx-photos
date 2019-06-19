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
    loadChildren: () => import('app/photos/photos.module').then(m => m.PhotosModule)
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadChildren: () => import('app/profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: '**', component: PageNotFoundComponent
  }
];
