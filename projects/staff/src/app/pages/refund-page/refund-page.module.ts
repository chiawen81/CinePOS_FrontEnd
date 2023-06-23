import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RefundPageComponent } from './refund-page.component';
import { RouterModule, Routes } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RefundModule } from '../../features/refund/refund.module';
import { CoreDirectivesModule } from 'projects/share-libs/src/lib/core/directives/core-directives.module';

const routes: Routes = [
  {
    path: '',
    component: RefundPageComponent,
  },
]
const materialModules = [
  MatInputModule,
  MatButtonModule,
  MatCheckboxModule,
];

@NgModule({
  declarations: [
    RefundPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    RefundModule,
    CoreDirectivesModule,
    ...materialModules
  ]
})
export class RefundPageModule { }
