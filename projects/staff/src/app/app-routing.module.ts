import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { STATIC_ROUTES } from './core/constant/routes.constant';
import { AuthGuard } from './core/guards/auth/auth.guard';

const routes: Routes = [
  /**登入頁 */
  {
    path: STATIC_ROUTES.LOGIN,
    loadChildren: () => import('./pages/login-page/login-page.module').then(m => m.LoginPageModule)
  },
  /**主頁 */
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/home-page/home-page.module').then(m => m.HomePageModule)
  },
  /**訂票頁 */
  {
    path: STATIC_ROUTES.BOOKING.ROOT,
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/booking-page/booking-page.module').then(m => m.BookingPageModule)
  },
  /**結帳頁 */
  {
    path: STATIC_ROUTES.PAYMENT,
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/payment-page/payment-page.module').then(m => m.PaymentPageModule)
  },
  /**退票頁 */
  {
    path: STATIC_ROUTES.REFUND,
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/refund-page/refund-page.module').then(m => m.RefundPageModule)
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
