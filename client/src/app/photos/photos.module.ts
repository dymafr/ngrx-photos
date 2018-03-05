import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosComponent } from './components/photos/photos.component';
import { PHOTOS_ROUTING } from './photos.routing';
import { RouterModule } from '@angular/router';
import { PhotosService } from './services/photos.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PhotosEffects} from './redux/photos.effects';
import { photosReducers } from './redux/photos.reducers';
import { LayoutModule } from '../shared/layout/layout.module';

@NgModule({
  imports: [
    LayoutModule,
    StoreModule.forFeature('photos', photosReducers),
    EffectsModule.forFeature([PhotosEffects]),
    RouterModule.forChild(PHOTOS_ROUTING)
  ],
  declarations: [
    PhotosComponent
  ],
  providers: [PhotosService]
})
export class PhotosModule { }
