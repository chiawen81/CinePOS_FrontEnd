import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { BookingService } from '../services/booking.service';
import { STATIC_ROUTES } from '../../../core/constant/routes.constant';

@Injectable({
  providedIn: 'root'
})
export class BookingGuard implements CanActivate {
  constructor(
    private bookingService:BookingService,
    private router: Router
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.bookingService.getShopCart().scheduleId) {
      this.router.navigate([STATIC_ROUTES.BOOKING.ROOT]);
      return false;
    }
    return true;
  }

}
