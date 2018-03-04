import { Route } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { PageNotFoundComponent } from './shared/layout/page-not-found/page-not-found.component';

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
