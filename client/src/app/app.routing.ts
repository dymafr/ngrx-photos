import { Route } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { PageNotFoundComponent } from './share/layout/page-not-found/page-not-found.component';

export const APP_ROUTING: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'photos'
  },
  {
    path: 'auth',
    loadChildren: 'app/auth/auth.module#AuthModule'
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
