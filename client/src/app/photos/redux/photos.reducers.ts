import { Action } from "rxjs/scheduler/Action";
import { PhotosActionType, SEARCH_COMPLETE, SET_FILTER } from "./photos.actions";
import { Photo } from '../../shared/models/photo.model';

export interface PhotosState {
  photos: Photo[];
  filter: string;
  page: number;
}

const initialState: PhotosState = {
  photos: [],
  filter: null,
  page: 0
};

export function photosReducers(state: PhotosState = initialState, action: PhotosActionType) {
  switch (action.type) {
    case SEARCH_COMPLETE:
      return {
        photos: action.payload,
        page: ++state.page
      };
    case SET_FILTER:
      return {
        ...state,
        page: 0,
        filter: action.payload
      };
    default:
      return state;
  }
}
