import * as AuthActions from './auth.actions';
import { User } from '../../share/models/user.model';
import { createFeatureSelector, createSelector, MetaReducer, ActionReducer } from '@ngrx/store';
import * as AuthHelper from './auth.helpers';

export interface AuthState {
  isLoggedin: boolean;
  token: string;
  error: string;
  user: User;
}

const initialState: AuthState = {
  isLoggedin: false,
  token: null,
  error: null,
  user: null
};

export function authReducers(state: AuthState = initialState, action: AuthActions.AuthActionType): AuthState {
  switch (action.type) {
    case AuthActions.LOGIN_SUCCESS:
      AuthHelper.saveToken(action.payload);
      return {
        ...state,
        isLoggedin: true,
        token: action.payload,
        error: null
      };
    case AuthActions.LOGIN_ERROR:
      return {
        ...state,
        error: action.payload,
        token: null,
        user: null,
        isLoggedin: false
      };
    case AuthActions.REGISTER_SUCCESS:
      return state;
    case AuthActions.SET_TOKEN:
      return {
        ...state,
        token: action.payload
      };
    case AuthActions.REGISTER_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case AuthActions.LOGOUT:
      localStorage.removeItem('token');
      return initialState;
    case AuthActions.SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
}


