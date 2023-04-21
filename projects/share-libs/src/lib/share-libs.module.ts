import { NgModule } from '@angular/core';
import { LoginComponent } from './features/login/components/login.component';
import { ShareLibsComponent } from './share-libs.component';




@NgModule({
  declarations: [
    ShareLibsComponent,
    LoginComponent
  ],
  imports: [
  ],
  exports: [
    ShareLibsComponent,
    LoginComponent
  ]
})
export class ShareLibsModule { }
