import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RefundPageComponent } from './refund-page.component';
import { RouterModule, Routes } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule
  ]
})
export class RefundPageModule { }
