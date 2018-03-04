import { Action } from '@ngrx/store';
import { User } from '../../share/models/user.model';

export const TRY_REFRESH_TOKEN = 'init_auth_state';
export const SET_TOKEN = 'set_token';
export const TRY_LOGIN = 'try_login';
export const LOGIN_SUCCESS = 'login_success';
export const LOGIN_ERROR = 'login_error';
export const TRY_REGISTER = 'try_register';
export const REGISTER_SUCCESS = 'register_success';
export const REGISTER_ERROR = 'register_error';
export const LOGOUT = 'logout';

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

export type AuthActionType = TryLogin |
                             LoginSuccess |
                             LoginError |
                             TryRegister |
                             RegisterSuccess |
                             RegisterError |
                             TryRefreshToken |
                             SetToken |
                             Logout;

