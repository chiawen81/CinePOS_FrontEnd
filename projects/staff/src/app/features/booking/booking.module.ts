import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateSelectComponent } from './components/date-select/date-select.component';



@NgModule({
  declarations: [
    DateSelectComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DateSelectComponent
  ]
})
export class BookingModule { }
