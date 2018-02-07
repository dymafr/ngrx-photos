import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import { JwtToken } from '../models/jwt-token.model';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this.authService.jwtToken.pipe(
        map( (jwtToken: JwtToken) => {
          if (jwtToken.isAuthenticated) {
            return true;
          } else {
            this.router.navigate(['/signin']);
            return false;
          }
        })
      );

  }
}
