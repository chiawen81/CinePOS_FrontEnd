import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomCurrencyPipe, PaymentPageComponent } from './payment-page.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DialogOrderDetailComponent } from './components/dialog-order-detail/dialog-order-detail.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentPageComponent,
  },
]

@NgModule({
  declarations: [
    PaymentPageComponent,
    CustomCurrencyPipe,
    DialogOrderDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class PaymentPageModule { }
