import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page.component';
import { RouterModule, Routes } from '@angular/router';
import { ShareLibsModule } from 'projects/share-libs/src/public-api';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
  },
]

@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ShareLibsModule
  ]
})
export class LoginPageModule { }
