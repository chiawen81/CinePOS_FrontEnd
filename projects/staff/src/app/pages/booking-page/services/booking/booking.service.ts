import { Injectable } from '@angular/core';
import { ScheduleListRes, StaffService } from 'projects/staff/src/app/api/cinePOS-api';
import { ShopCartInterface, seatInterface } from 'projects/staff/src/app/core/interface/shop-cart.interface';
import { Observable, Subject, filter, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  dateSelect$ = new Subject<string>(); // 日期選擇控制
  onDestroy$ = new Subject<void>(); // 結束後結束訂閱控制

  /**單筆購物車資訊*/
  shopCart: ShopCartInterface = {
    ticketId: '',
    ticketTypeId: '',
    ticketType: '',
    price: 0,
    seat: [],
    movieId: '',
    title: '',
    scheduleId: ''
  }


  constructor(
    private staffService: StaffService
  ) { }

  /**場次查詢API */
  v1StaffScheduleListGet$(reqData: { startDate: string, endDate: string }): Observable<ScheduleListRes> {
    return this.staffService.v1StaffScheduleListGet(reqData.startDate, reqData.endDate)
      .pipe(
        tap(res => res.code !== 1 && alert(res.message)),
        filter(res => res.code === 1)
      )
  }

  /**設定單筆購物車資訊*/
  setShopCart(
    key: keyof ShopCartInterface,
    value: string | number | seatInterface
  ): void {
    if (key === 'seat') {
      (this.shopCart.seat).push(value as seatInterface);
    } else if (key === 'price') {
      this.shopCart.price = value as number;
    } else {
      this.shopCart[key] = value as string;
    }
  }

  getShopCart(): ShopCartInterface{
    return this.shopCart;
  }
}
