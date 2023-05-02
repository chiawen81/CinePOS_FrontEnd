import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RefundPageComponent } from './refund-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: RefundPageComponent,
  },
]

@NgModule({
  declarations: [
    RefundPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class RefundPageModule { }
