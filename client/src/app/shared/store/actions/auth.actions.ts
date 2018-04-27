import { Action } from '@ngrx/store';
import { User } from '../../models/user.model';

export const TRY_REFRESH_TOKEN = 'try_refresh_token';
export const SET_TOKEN = 'set_token';
export const TRY_LOGIN = 'try_login';
export const LOGIN_SUCCESS = 'login_success';
export const LOGIN_ERROR = 'login_error';
export const TRY_REGISTER = 'try_register';
export const REGISTER_SUCCESS = 'register_success';
export const REGISTER_ERROR = 'register_error';
export const SET_CURRENT_USER = 'set_current_user';
export const LOGOUT = 'logout';
export const FETCH_USER = '[ user ] fetch user';

export class TryLogin implements Action {
  readonly type = TRY_LOGIN;
  constructor(public payload: { email: string, password: string }) {}
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload: string) {}
}

export class LoginError implements Action {
  readonly type = LOGIN_ERROR;
  constructor(public payload: any) {}
}

export class TryRegister implements Action {
  readonly type = TRY_REGISTER;
  constructor(public payload: { email: string, name: string, password: string }) {}
}

export class RegisterSuccess implements Action {
  readonly type = REGISTER_SUCCESS;
}

export class RegisterError implements Action {
  readonly type = REGISTER_ERROR;
  constructor(public payload: string) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class TryRefreshToken implements Action {
  readonly type = TRY_REFRESH_TOKEN;
}
export class SetToken implements Action {
  readonly type = SET_TOKEN;
  constructor(public payload: string) {}
}

export class SetCurrentUser implements Action {
  readonly type = SET_CURRENT_USER;
  constructor(public payload: User) {}
}

export class FetchUser implements Action {
  readonly type = FETCH_USER;
  constructor() { }
}

export type AuthActionType = TryLogin |
                             LoginSuccess |
                             LoginError |
                             TryRegister |
                             RegisterSuccess |
                             RegisterError |
                             TryRefreshToken |
                             SetToken |
                             SetCurrentUser |
                             Logout;

