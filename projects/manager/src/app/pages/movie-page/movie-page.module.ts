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
import { MovieViewPageComponent } from './movie-view-page/movie-view-page.component';
import { MovieListPageComponent } from './movie-list-page/movie-list-page.component';
import { CardModule } from '../../features/card/card.module';
import { TableModule } from '../../features/table/table.module';
import { MatPaginatorModule } from '@angular/material/paginator';


const materialModules = [
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatButtonModule,
  MatPaginatorModule
];

@NgModule({
  declarations: [
    MoviePageComponent,
    MovieDetailPageComponent,
    MovieViewPageComponent,
    MovieListPageComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MoviePageRoutingModule,
    ShareLibsModule,
    CardModule,
    TableModule,
    ...materialModules,

  ]
})

export class MoviePageModule { }
