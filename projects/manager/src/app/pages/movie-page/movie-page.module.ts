import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviePageRoutingModule } from './movie-page-routing.module';
import { MoviePageComponent } from './movie-page.component';
import { MovieDetailPageComponent } from './movie-detail-page/movie-detail-page.component';


@NgModule({
  declarations: [
    MoviePageComponent,
    MovieDetailPageComponent
  ],
  imports: [
    CommonModule,
    MoviePageRoutingModule
  ]
})
export class MoviePageModule { }
