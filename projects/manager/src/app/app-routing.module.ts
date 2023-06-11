import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { STATIC_ROUTES } from './core/constant/routes.constant';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { TimetablePageComponent } from './pages/timetable-page/timetable-page.component';
import { SamplePageComponent } from './pages/sample-page/sample-page.component';
import { GuidelineBackComponent } from './pages/guideline-back/guideline-back.component';
import { AuthGuard } from './core/guards/auth/auth.guard';


const routes: Routes = [
  {
    path: STATIC_ROUTES.DASHBOARD,
    component: DashboardPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: STATIC_ROUTES.THEATER,
    loadChildren: () => import('./pages/theater-page/theater-page.module').then(m => m.TheaterPageModule),
    canLoad:[AuthGuard]
  },
  {
    path: STATIC_ROUTES.MOVIE,
    loadChildren: () => import('./pages/movie-page/movie-page.module').then(m => m.MoviePageModule),
    canLoad:[AuthGuard]
  },
  {
    path: STATIC_ROUTES.TIMETABLE,
    loadChildren: () => import('./pages/timetable-page/timetable-page.module').then(m => m.TimetablePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: STATIC_ROUTES.SAMPLE,
    component: SamplePageComponent,
  },
  {
    path: STATIC_ROUTES.LOGIN,
    loadChildren: () => import('./pages/login-page/login-page.module').then(m => m.LoginPageModule),
  }, 
  {
    path: STATIC_ROUTES.GUIDELINE,
    component: GuidelineBackComponent
  },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
