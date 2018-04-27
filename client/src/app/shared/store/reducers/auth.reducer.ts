import * as AuthActions from '../actions';
import { User } from '../../models/user.model';

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

export function authReducer(state: AuthState = initialState, action: AuthActions.AuthActionType): AuthState {
  switch (action.type) {
    case AuthActions.LOGIN_SUCCESS:
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
        isLoggedin: true,
        token: action.payload,
        error: null
      };
    case AuthActions.REGISTER_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case AuthActions.LOGOUT:
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


