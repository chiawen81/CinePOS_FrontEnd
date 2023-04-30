import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeatingPlanPageRoutingModule } from './seating-plan-page-routing.module';
import { SeatingPlanPageComponent } from './seating-plan-page.component';
import { SeatingPlanDetailPageComponent } from './seating-plan-detail-page/seating-plan-detail-page.component';
import { Step1Component } from './seating-plan-detail-page/step/components/step1/step1.component';
import { Step2Component } from './seating-plan-detail-page/step/components/step2/step2.component';
import { Step3Component } from './seating-plan-detail-page/step/components/step3/step3.component';


@NgModule({
  declarations: [
    SeatingPlanPageComponent,
    SeatingPlanDetailPageComponent,
    Step1Component,
    Step2Component,
    Step3Component
  ],
  imports: [
    CommonModule,
    SeatingPlanPageRoutingModule
  ]
})
export class SeatingPlanPageModule { }
