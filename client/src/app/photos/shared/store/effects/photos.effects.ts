import { Injectable } from "@angular/core";
import { Actions, ofType, Effect } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { withLatestFrom, switchMap, catchError, map } from 'rxjs/operators';
import { empty } from 'rxjs/observable/empty';
import { PhotosState } from "../reducers";
import { PhotosService } from "../../../../shared/services/photos.service";
import { SEARCH_PHOTOS, SearchComplete } from "../actions";


@Injectable()
export class PhotosEffects {
  @Effect()
  searchPhoto$ = this.actions.pipe(
    ofType(SEARCH_PHOTOS),
    switchMap( () => {
      return this.photoService.getPictures().pipe(
        map( (res: any) => {
          console.log(res);
          return new SearchComplete(res);
        }),
        catchError( err => {
          console.log(err);
          return empty();
        })
      );
    })
  );


  constructor(private actions: Actions,
              private store: Store<PhotosState>,
              private photoService: PhotosService) {}
}
