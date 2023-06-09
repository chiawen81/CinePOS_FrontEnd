import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RefundItemComponent } from './components/refund-item/refund-item.component';



@NgModule({
  declarations: [
    RefundItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RefundItemComponent
  ]
})
export class RefundModule { }
