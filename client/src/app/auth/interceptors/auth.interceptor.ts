import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Store, select } from "@ngrx/store";
import { AuthState } from "../redux/auth.reducers";
import { map, take, switchMap } from "rxjs/operators";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private store: Store<AuthState>) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return this.store.pipe(
        select('auth'),
        take(1),
        map( (state: AuthState) => state.token ),
        switchMap( (token: string) => {
          if (token) {
            const authReq = req.clone({
              headers: req.headers.set('authorization', token)
            });
            return next.handle(authReq);
          } else {
            return next.handle(req);
          }
        })
      );
    }
}
