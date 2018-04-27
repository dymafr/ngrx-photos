import { createSelector } from '@ngrx/store';
import { createFeatureSelector } from '@ngrx/store';
import { AuthState } from '../reducers';

export const authSelector = createFeatureSelector('auth');
export const tokenSelector = createSelector(authSelector, (authState: AuthState) => authState.token);
export const currentUserSelector = createSelector(authSelector, (authState: AuthState) => authState.user);
export const isLoggedinSelector = createSelector(authSelector, (authState: AuthState) => authState.isLoggedin);
export const authErrorSelector = createSelector(authSelector, (authState: AuthState) => authState.error);
