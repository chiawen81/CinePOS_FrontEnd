import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TimetablePageComponent } from './timetable-page.component';
import { DateSelectComponent } from './component/date-select/date-select.component';
import { RatePipe } from './pipe/rate.pipe';
import { DxDraggableModule, DxSchedulerModule } from 'devextreme-angular';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  {
    path: '',
    component: TimetablePageComponent,
  },
]

@NgModule({
  declarations: [
    TimetablePageComponent,
    DateSelectComponent,
    RatePipe,

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DxSchedulerModule,
    DxDraggableModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    FormsModule,
  ]
})
export class TimetablePageModule { }
