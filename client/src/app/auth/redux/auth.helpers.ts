import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.reducers";

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const getUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);

export function saveToken(token: string) {
  localStorage.setItem('token', token);
}

export function loadToken() {
  return localStorage.getItem('token');
}
