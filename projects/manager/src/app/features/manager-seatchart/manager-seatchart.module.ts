import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerSeatchartComponent } from './components/manager-seatchart/manager-seatchart.component';
import { ManagerSeatchartSeatComponent } from './components/manager-seatchart-seat/manager-seatchart-seat.component';



@NgModule({
  declarations: [
    ManagerSeatchartComponent,
    ManagerSeatchartSeatComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ManagerSeatchartComponent
  ]
})
export class ManagerSeatchartModule { }
