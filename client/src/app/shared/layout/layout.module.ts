import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { TopbarComponent } from './topbar/topbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const COMPONENTS = [
  TopbarComponent,
  PageNotFoundComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MaterialModule,
  ],
  declarations: [
    ...COMPONENTS
  ],
  exports: [
    FlexLayoutModule,
    CommonModule,
    MaterialModule,
    COMPONENTS
  ],
})
export class LayoutModule { }
