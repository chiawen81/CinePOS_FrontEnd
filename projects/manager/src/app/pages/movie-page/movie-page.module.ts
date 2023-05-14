import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviePageRoutingModule } from './movie-page-routing.module';
import { MoviePageComponent } from './movie-page.component';
import { MovieDetailPageComponent } from './movie-detail-page/movie-detail-page.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShareLibsModule } from 'projects/share-libs/src/public-api';
import { ManagerService } from '../../api/cinePOS-api';
import { HttpClientModule } from '@angular/common/http';

const materialModules = [
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatInputModule,
  MatButtonModule,
];

@NgModule({
  declarations: [
    MoviePageComponent,
    MovieDetailPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MoviePageRoutingModule,
    ...materialModules,
    ShareLibsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ManagerService],
})

export class MoviePageModule { }
