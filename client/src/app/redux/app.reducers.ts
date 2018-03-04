import { ActionReducerMap, MetaReducer, ActionReducer } from '@ngrx/store';

export const rootReducers: ActionReducerMap<any> = {
};

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state: any, action: any): any {
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [logger];
