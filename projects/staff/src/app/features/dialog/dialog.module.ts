import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileGialogComponent } from './components/profile-gialog/profile-gialog.component';
import { ShareLibsModule } from 'projects/share-libs/src/public-api';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { SeatDialogComponent } from './components/seat-dialog/seat-dialog.component';
import { SeatchartModule } from '../seatchart/seatchart.module';
import { DeleteAllDialogComponent } from './components/delete-all-dialog/delete-all-dialog.component';


@NgModule({
  declarations: [
    ProfileGialogComponent,
    SeatDialogComponent,
    DeleteAllDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    SeatchartModule
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
