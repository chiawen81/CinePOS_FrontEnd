import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ManagerSeatchartComponent } from './components/manager-seatchart/manager-seatchart.component';
import { ManagerSeatchartSeatComponent } from './components/manager-seatchart-seat/manager-seatchart-seat.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    ManagerSeatchartComponent,
    ManagerSeatchartSeatComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule
  ],
  exports: [
    ManagerSeatchartComponent,
    ManagerSeatchartSeatComponent

  ]
})
export class ManagerSeatchartModule { }
