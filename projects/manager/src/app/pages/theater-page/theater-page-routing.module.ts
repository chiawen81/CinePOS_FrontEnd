import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { STATIC_ROUTES } from '../../core/constant/routes.constant';
import { TheaterListPageComponent } from './theater-list-page/theater-list-page.component';
import { TheaterDetailPageComponent } from './theater-detail-page/theater-detail-page.component';
import { TheaterViewPageComponent } from './theater-view-page/theater-view-page.component';

const routes: Routes = [{
  path: '',
  children: [
    { path: '', component: TheaterListPageComponent },
    { path: `${STATIC_ROUTES.DETAIL}/${STATIC_ROUTES.CREATE}`, component: TheaterDetailPageComponent },
    { path: ':id', component: TheaterViewPageComponent },
    { path: `${STATIC_ROUTES.DETAIL}/${STATIC_ROUTES.EDIT}/:id`, component: TheaterDetailPageComponent },
    { path: `${STATIC_ROUTES.LIST}`, component: TheaterListPageComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TheaterPageRoutingModule { }
