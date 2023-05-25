import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateSelectComponent } from './components/date-select/date-select.component';
import { MovieComponent } from './components/movie/movie.component';
import { MovieTimeComponent } from './components/movie-time/movie-time.component';



@NgModule({
  declarations: [
    DateSelectComponent,
    MovieComponent,
    MovieTimeComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DateSelectComponent,
    MovieComponent,
  ]
})
export class BookingModule { }
