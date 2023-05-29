import { Injectable } from '@angular/core';
import { ScheduleListRes, StaffService } from 'projects/staff/src/app/api/cinePOS-api';
import { ShopCartInterface, seatInterface, ticketInterface } from 'projects/staff/src/app/core/interface/shop-cart.interface';
import { Observable, Subject, filter, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  dateSelect$ = new Subject<string>(); // 日期選擇控制
  onDestroy$ = new Subject<void>(); // 結束後結束訂閱控制

  /**單筆購物車資訊*/
  shopCart: ShopCartInterface = {
    ticket: [],
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
  deleteArr(key: 'ticket'| 'seat'): void{
    this.shopCart[key] = [];
  }
  /**設定單筆購物車資訊*/
  setShopCart(
    key: keyof ShopCartInterface,
    value: string | number | seatInterface | ticketInterface
  ): void {
    if (key === 'seat') {
      (this.shopCart.seat).push(value as seatInterface);
    } else if (key === 'ticket') {
      (this.shopCart.ticket).push(value as ticketInterface);
    } else {
      this.shopCart[key] = value as string;
    }
  }

  getShopCart(): ShopCartInterface{
    return this.shopCart;
  }
}
