import { NgModule } from '@angular/core';
import { LoginComponent } from './features/login/components/login.component';
import { ShareLibsComponent } from './share-libs.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';


const materialModules = [
  MatInputModule,
  MatSliderModule,
];


@NgModule({
  declarations: [
    ShareLibsComponent,
    LoginComponent
  ],
  imports: [
    ...materialModules
  ],
  exports: [
    ShareLibsComponent,
    LoginComponent
  ]
})
export class ShareLibsModule { }
