import { Injectable } from "@angular/core";
import { Actions, ofType, Effect } from '@ngrx/effects';
import { SEARCH_PHOTOS, SearchComplete } from "./photos.actions";
import { Store } from "@ngrx/store";
import { PhotosState } from "./photos.reducers";
import { PhotosService } from '../services/photos.service';
import { withLatestFrom, switchMap, catchError, map } from 'rxjs/operators';
import { empty } from 'rxjs/observable/empty';


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
