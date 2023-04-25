import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadersModule } from './features/headers/headers.module';
import { ShopCartModule } from './features/shop-cart/shop-cart.module';

import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';

const materialModules = [
  MatInputModule,
  MatSliderModule,
];

const featureModules = [
  HeadersModule,
  ShopCartModule,
];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ...featureModules,
    ...materialModules,
  ],
  exports: [
    ...materialModules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
