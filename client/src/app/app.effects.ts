import { Effect, ofType, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { tap } from 'rxjs/operators';

@Injectable()
export class AppEffects {
  @Effect({ dispatch: false })
  routerAction$ = this.actions$.pipe(
    ofType(ROUTER_NAVIGATION),
    tap( (action) => console.log(action))
  );

  constructor(private actions$: Actions) {}

}
