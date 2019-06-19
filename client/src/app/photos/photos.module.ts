import { NgModule } from '@angular/core';
import { PhotosComponent } from './components/photos/photos.component';
import { PHOTOS_ROUTING } from './photos.routing';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PhotosService } from '../shared/services/photos.service';
import { PhotosEffects } from './shared/store/effects';
import { photosReducers } from './shared/store/reducers';
import { LayoutModule } from '../shared/modules/layout.module';

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
