import { Action } from "rxjs/scheduler/Action";
import { PhotosActionType, SEARCH_COMPLETE, SET_FILTER } from "../actions";
import { Photo } from '../../../../shared/models/photo.model';
import { State } from "../../../../shared/store";

export interface PhotosState {
  photos: Photo[];
  filter: string;
}

const initialState: PhotosState = {
  photos: [],
  filter: null,
};

export function photosReducers(state: PhotosState = initialState, action: PhotosActionType) {
  switch (action.type) {
    case SEARCH_COMPLETE:
      return {
        photos: action.payload
      };
    case SET_FILTER:
      return {
        ...state,
        filter: action.payload
      };
    default:
      return state;
  }
}
