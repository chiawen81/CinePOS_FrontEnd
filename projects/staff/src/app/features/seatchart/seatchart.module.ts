import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeatchartSeatComponent } from './components/seatchart-seat/seatchart-seat.component';
import { SeatchartComponent } from './components/seatchart/seatchart.component';




@NgModule({
  declarations: [
    SeatchartSeatComponent,
    SeatchartComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    SeatchartComponent
  ]
})
export class SeatchartModule { }
