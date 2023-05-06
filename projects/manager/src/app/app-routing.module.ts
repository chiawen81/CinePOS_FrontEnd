import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { STATIC_ROUTES } from './core/constant/routes.constant';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { TimetablePageComponent } from './pages/timetable-page/timetable-page.component';
import { SamplePageComponent } from './pages/sample-page/sample-page.component';


const routes: Routes = [
  {
    path:STATIC_ROUTES.DASHBOARD,
    component: DashboardPageComponent
  },
  {
    path:STATIC_ROUTES.SEATING_PLAN,
    loadChildren: () => import('./pages/seating-plan-page/seating-plan-page.module').then(m => m.SeatingPlanPageModule)
  },
  {
    path:STATIC_ROUTES.MOVIE,
    loadChildren: () => import('./pages/movie-page/movie-page.module').then(m => m.MoviePageModule)
  },
  {
    path:STATIC_ROUTES.TIMETABLE,
    component: TimetablePageComponent
  },
  {
    path:STATIC_ROUTES.SAMPLE,
    component: SamplePageComponent
  },
  {
    path: STATIC_ROUTES.LOGIN,
    loadChildren: () => import('./pages/login-page/login-page.module').then(m => m.LoginPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
