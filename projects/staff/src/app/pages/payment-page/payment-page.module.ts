import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomCurrencyPipe, PaymentPageComponent } from './payment-page.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: PaymentPageComponent,
  },
]

@NgModule({
  declarations: [
    PaymentPageComponent,
    CustomCurrencyPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class PaymentPageModule { }
