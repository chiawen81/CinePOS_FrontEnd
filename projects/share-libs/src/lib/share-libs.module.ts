import { NgModule } from '@angular/core';
import { LoginComponent } from './features/login/components/login.component';
import { ShareLibsComponent } from './share-libs.component';
import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CoreDirectivesModule } from './core/directives/core-directives.module';
import { CommonModule } from '@angular/common';


const materialModules = [
  MatInputModule,
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule
];


@NgModule({
  declarations: [
    ShareLibsComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoreDirectivesModule,
    ...materialModules
  ],
  exports: [
    ShareLibsComponent,
    LoginComponent
  ]
})
export class ShareLibsModule { }
