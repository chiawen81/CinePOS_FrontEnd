import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateSelectComponent } from './components/date-select/date-select.component';
import { MovieComponent } from './components/movie/movie.component';
import { MovieTimeComponent } from './components/movie-time/movie-time.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { TicketSelectComponent } from './components/ticket-select/ticket-select.component';
import { MatIconModule } from '@angular/material/icon';

const materialModules = [
  MatIconModule
];

@NgModule({
  declarations: [
    DateSelectComponent,
    MovieComponent,
    MovieTimeComponent,
    StepperComponent,
    TicketSelectComponent
  ],
  imports: [
    CommonModule,
    ...materialModules
  ],
  exports: [
    DateSelectComponent,
    MovieComponent,
    StepperComponent,
    TicketSelectComponent
  ]
})
export class BookingModule { }
