import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Photo } from '../../../shared/models/photo.model';
import { PhotosState } from '../../shared/store/reducers';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  public photos$: Observable<Photo[]> = this.store.pipe(
    select('photos'),
    map( (state: PhotosState) => state.photos )
  );

  constructor(private store: Store<PhotosState>) { }

  ngOnInit() {}

}
