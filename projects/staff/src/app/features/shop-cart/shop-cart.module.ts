import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopCartComponent } from './components/shop-cart/shop-cart.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    ShopCartComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
  ],
  exports: [
    ShopCartComponent
  ]
})
export class ShopCartModule { }
