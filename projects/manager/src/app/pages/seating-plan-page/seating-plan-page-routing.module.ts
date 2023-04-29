import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeatingPlanPageComponent } from './seating-plan-page.component';
import { STATIC_ROUTES } from '../../core/constant/routes.constant';
import { SeatingPlanDetailPageComponent } from './seating-plan-detail-page/seating-plan-detail-page.component';

const routes: Routes = [{
  path: '',
  children: [
    { path: '', component: SeatingPlanPageComponent },
    { path: `${STATIC_ROUTES.DETAIL}/${STATIC_ROUTES.CREATE}`, component: SeatingPlanDetailPageComponent },
    { path: STATIC_ROUTES.DETAIL + '/:id', component: SeatingPlanDetailPageComponent },
    { path: STATIC_ROUTES.DETAIL + STATIC_ROUTES.EDIT + '/:id', component: SeatingPlanDetailPageComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeatingPlanPageRoutingModule { }
