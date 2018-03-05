import { Injectable,  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import Unsplash from 'unsplash-js';
import { Store, select } from '@ngrx/store';
import { PhotosState } from '../redux/photos.reducers';
import { switchMap, take, map } from 'rxjs/operators';
import { Photo } from '../../shared/models/photo.model';

@Injectable()
export class PhotosService {
  private unsplash = new Unsplash({
    applicationId: 'd735ade0117e703f4c8b2ef98cfd27879291d34c8de2d7dd261616f684df435c',
    secret: '3860e72b9a84352726954fc3ce5820b4ee3f4e6751dbd6004e3ea4835c45cbd6',
    callback: 'http://127.0.0.1:3000/unsplash'
  });

  constructor(private store: Store<PhotosState>) {}

  public getPictures(per_page: number = 30): Observable<Photo[]>  {
    return this.store.pipe(
      select('photos'),
      take(1),
      switchMap( (state: PhotosState) => {
        const page = state.page;
        const filter = state.filter;
        if (filter) {
          return fromPromise(this.unsplash.search.photos(filter, page, per_page).then( res => res.json())).pipe(
            map( (res: any) => res.results)
          );
        } else {
          return fromPromise(this.unsplash.photos.listPhotos(page, per_page).then( result => result.json()));
        }
      })
    );
  }

}
