import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopCartComponent } from './components/shop-cart/shop-cart.component';
import { MatButtonModule } from '@angular/material/button';
import { ShopCartItemComponent } from './components/shop-cart-item/shop-cart-item.component';



@NgModule({
  declarations: [
    ShopCartComponent,
    ShopCartItemComponent
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
