import * as AuthActions from './auth.actions';
import { User } from '../share/models/user.model';
import { createFeatureSelector, createSelector, MetaReducer, ActionReducer } from '@ngrx/store';


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
    case AuthActions.INIT_AUTH_STATE:
      const loadedAuthState = loadData();
      return {
        ...state,
        ...loadedAuthState
      };
    case AuthActions.TRY_LOGIN:
      return state;
    case AuthActions.LOGIN_SUCCESS:
      saveData(action.payload);
      return {
        ...state,
        isLoggedin: true,
        token: action.payload.token,
        user: action.payload.user,
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
    case AuthActions.TRY_REGISTER:
      return state;
    case AuthActions.REGISTER_SUCCESS:
      return state;
    case AuthActions.REGISTER_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case AuthActions.LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const getUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);

function saveData(authData: { token: string, user: User }) {
  try {
    const serialize = JSON.stringify({ ...authData, isLoggedin: true });
    localStorage.setItem('user', serialize);
  } catch (err) {
  }
}

function loadData() {
  const serializedData = localStorage.getItem('user');
  if (serializedData) {
    try {
      const userDetails  = JSON.parse(serializedData);
      return userDetails;
    } catch (err) {
      return initialState;
    }
  } else {
    return initialState;
  }

}
