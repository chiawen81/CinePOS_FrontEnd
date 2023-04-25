import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopCartComponent } from './components/shop-cart/shop-cart.component';



@NgModule({
  declarations: [
    ShopCartComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ShopCartComponent
  ]
})
export class ShopCartModule { }
