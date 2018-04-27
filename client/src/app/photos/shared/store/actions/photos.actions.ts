import { Action } from '@ngrx/store';


export const SEARCH_PHOTOS = 'search_photos';
export const SEARCH_COMPLETE = 'search_complete';
export const SET_FILTER = 'set_filter';

export class SearchPhotos implements Action {
  readonly type = SEARCH_PHOTOS;
}

export class SearchComplete implements Action {
  readonly type = SEARCH_COMPLETE;
  constructor(public payload: string[]) {}
}

export class SetFilter implements Action {
  readonly type = SET_FILTER;
  constructor(public payload: string) {}
}

export type PhotosActionType = SearchComplete | SearchPhotos | SetFilter;
