import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosComponent } from './photos.component';
import { PHOTOS_ROUTING } from './photos.routing';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PHOTOS_ROUTING)
  ],
  declarations: [
    PhotosComponent
  ]
})
export class PhotosModule { }
