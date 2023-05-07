import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviePageRoutingModule } from './movie-page-routing.module';
import { MoviePageComponent } from './movie-page.component';
import { MovieDetailPageComponent } from './movie-detail-page/movie-detail-page.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    MoviePageComponent,
    MovieDetailPageComponent
  ],
  imports: [
    CommonModule,
    MoviePageRoutingModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
  ]
})

export class MoviePageModule { }
