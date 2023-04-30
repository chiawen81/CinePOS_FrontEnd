import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { STATIC_ROUTES } from '../../core/constant/routes.constant';
import { MovieDetailPageComponent } from './movie-detail-page/movie-detail-page.component';
import { MoviePageComponent } from './movie-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: MoviePageComponent },
      { path: `${STATIC_ROUTES.DETAIL}/${STATIC_ROUTES.CREATE}`, component: MovieDetailPageComponent },
      { path: STATIC_ROUTES.DETAIL + '/:id', component: MovieDetailPageComponent },
      { path: STATIC_ROUTES.DETAIL + STATIC_ROUTES.EDIT + '/:id', component: MovieDetailPageComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviePageRoutingModule { }
