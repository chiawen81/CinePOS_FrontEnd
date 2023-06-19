import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TheaterPageRoutingModule } from './theater-page-routing.module';
import { TheaterListPageComponent } from './theater-list-page/theater-list-page.component';
import { TheaterDetailPageComponent } from './theater-detail-page/theater-detail-page.component';
import { TheaterViewPageComponent } from './theater-view-page/theater-view-page.component';
import { Step1Component } from './theater-detail-page/step/components/step1/step1.component';
import { Step2Component } from './theater-detail-page/step/components/step2/step2.component';
import { Step3Component } from './theater-detail-page/step/components/step3/step3.component';

import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CardModule } from '../../features/card/card.module';
import { TableModule } from "../../features/table/table.module";
import { ManagerSeatchartModule } from "../../features/manager-seatchart/manager-seatchart.module";

@NgModule({
    declarations: [
        TheaterListPageComponent,
        TheaterViewPageComponent,
        TheaterDetailPageComponent,
        Step1Component,
        Step2Component,
        Step3Component
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        TheaterPageRoutingModule,
        MatIconModule,
        MatRadioModule,
        MatSelectModule,
        MatDividerModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatButtonModule,
        MatPaginatorModule,
        CardModule,
        TableModule,
        ManagerSeatchartModule
    ]
})
export class TheaterPageModule { }
