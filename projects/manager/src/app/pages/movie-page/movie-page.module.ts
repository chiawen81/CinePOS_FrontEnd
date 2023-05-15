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
import { MatButtonModule } from '@angular/material/button';
import { CardModule } from '../../features/card/card.module';

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
    MatButtonModule,
    CardModule
  ]
})

export class MoviePageModule { }
