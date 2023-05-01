import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileGialogComponent } from './components/profile-gialog/profile-gialog.component';
import { ShareLibsModule } from 'projects/share-libs/src/public-api';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProfileGialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  exports: [
    ProfileGialogComponent
  ],
  providers: [
    {
      provide: MAT_DIALOG_DATA,
      useValue: {}
    }
  ]
})
export class DialogModule { }
