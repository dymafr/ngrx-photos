import { Action, ActionReducerMap, MetaReducer, ActionReducer } from '@ngrx/store';

export const rootReducers: ActionReducerMap<any> = {
};

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state: any, action: any): any {
    // console.log('state : ', state);
    // console.log('action : ', action);
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [logger];
