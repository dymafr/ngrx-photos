import { AuthState, authReducer } from './reducers';
import { ActionReducerMap, ActionReducer } from '@ngrx/store';

export interface State  {
  auth: AuthState;
}

export const reducersMap: ActionReducerMap<State> = {
  auth: authReducer,
};
