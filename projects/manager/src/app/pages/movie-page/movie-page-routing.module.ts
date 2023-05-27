import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { STATIC_ROUTES } from '../../core/constant/routes.constant';
import { MovieDetailPageComponent } from './movie-detail-page/movie-detail-page.component';
import { MoviePageComponent } from './movie-page.component';
import { MovieViewPageComponent } from './movie-view-page/movie-view-page.component';
import { MovieListPageComponent } from './movie-list-page/movie-list-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: MoviePageComponent },
      { path: `${STATIC_ROUTES.DETAIL}/${STATIC_ROUTES.CREATE}`, component: MovieDetailPageComponent },
      { path: STATIC_ROUTES.DETAIL + '/:id', component: MovieViewPageComponent },
      { path: `${STATIC_ROUTES.DETAIL}/${STATIC_ROUTES.EDIT}/:id`, component: MovieDetailPageComponent },
      { path: `${STATIC_ROUTES.LIST}`, component: MovieListPageComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviePageRoutingModule { }
