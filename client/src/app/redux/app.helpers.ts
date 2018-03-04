import { Action } from '@ngrx/store';

export function parseUrl(action) {
  return action.payload.routerState.url;
}
