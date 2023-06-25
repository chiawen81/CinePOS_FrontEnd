import { Injectable } from '@angular/core';
import { StorageService } from 'projects/manager/src/app/core/services/storage/storage.service';
import { CheckLockReq, CheckLockRes, CreateTicketReq, CreateTicketRes, ScheduleListRes, SeatRes, StaffService, TicketTypeRes } from 'projects/staff/src/app/api/cinePOS-api';
import { StorageEnum } from 'projects/staff/src/app/core/enums/storage/storage-enum';
import { ShopCartInterface, seatInterface, ticketInterface } from 'projects/staff/src/app/core/interface/shop-cart.interface';
import { Observable, Subject, filter, tap } from 'rxjs';
interface SeatData {
  seatName: string;
  isActive: boolean;
}

interface ticketDataInterface {
  orderId: string;
  movieId: string;
  seatId: string;
  price: number;
  isRefund: boolean;
  paymentMethod: number;
}
@Injectable({
  providedIn: 'root'
})
export class BookingService {

  dateSelect$ = new Subject<string>(); // 日期選擇控制
  onDestroy$ = new Subject<void>(); // 結束後結束訂閱控制
  shopCartSelect$ = new Subject<void>(); // 控制購物車從LocalStorage取得最新資料

  /**單筆購物車資訊*/
  shopCart: ShopCartInterface = {
    ticket: [],
    seat: [],
    movieId: '',
    title: '',
    scheduleId: ''
  }
  /**暫存已選取座位*/
  tempSeatArray: string[] = [];


  constructor(
    private staffService: StaffService,
    private storageService: StorageService
  ) { }

  /**場次查詢API */
  v1StaffScheduleListGet$(reqData: { startDate: string, endDate: string }): Observable<ScheduleListRes> {
    return this.staffService.v1StaffScheduleListGet(reqData.startDate, reqData.endDate)
      .pipe(
        tap(res => res.code !== 1 && alert(res.message)),
        filter(res => res.code === 1)
      )
  }
  /**取得場次座位表API */
  v1StaffSeatScheduleIdGet$(scheduleId: string): Observable<SeatRes> {
    return this.staffService.v1StaffSeatScheduleIdGet(scheduleId)
      .pipe(
        tap(res => res.code !== 1 && alert(res.message)),
        filter(res => res.code === 1)
      )
  }
  /**取得票種API */
  v1StaffTicketTypeGet$(): Observable<TicketTypeRes> {
    return this.staffService.v1StaffTicketTypeGet()
      .pipe(
        tap(res => res.code !== 1 && alert(res.message)),
        filter(res => res.code === 1)
      )
  }
  /**檢查座位是否有被鎖住API */
  v1StaffSeatCheckLockPost$(): Observable<CheckLockRes> {
    const checkLockReq: CheckLockReq = {
      scheduleId: this.shopCart.scheduleId,
      seats: this.tempSeatArray
    }
    return this.staffService.v1StaffSeatCheckLockPost(checkLockReq)
    // 外層控制 res.code !== 1
  }
  /**新增電影票API */
  v1StaffTicketPost$(): Observable<CreateTicketRes> {
    const ticketData: ticketDataInterface[] = [];
    this.shopCart.seat.forEach((item, index) => {
      ticketData.push({
        orderId: '',
        movieId: this.shopCart.movieId,
        seatId: item.seatId,
        price: this.shopCart.ticket[index].price,
        isRefund: false,
        paymentMethod: 0
      })
    });
    const createTicketReq: CreateTicketReq = {
      ticketData: ticketData
    }
    return this.staffService.v1StaffTicketPost(createTicketReq)
      .pipe(
        tap(res => res.code !== 1 && alert(res.message)),
        filter(res => res.code === 1)
      )
  }

  /**將單筆購物車資訊寫回購物車並且存回 LocalStorage */
  setShopCartToLocal(isAdd:boolean,deleteIndex?:number): void {
    let ShopCartData = this.storageService.getLocalStorage(StorageEnum.shopCartData) as ShopCartInterface[];
    !!ShopCartData ? ShopCartData = ShopCartData: ShopCartData = []
    if(isAdd){
      ShopCartData.push(this.shopCart);

    }else{
      ShopCartData = ShopCartData.filter((_, index) => index !== deleteIndex);
    }
    this.storageService.setLocalStorage(StorageEnum.shopCartData,ShopCartData);
    isAdd? this.deleteShopCart('all'): '';
    this.shopCartSelect$.next();
  }



  /**修改暫存已選取座位*/
  changeTempSeatArray(seatData: SeatData): void {
    if (seatData.isActive) {
      this.tempSeatArray.push(seatData.seatName);
    } else {
      this.tempSeatArray = this.tempSeatArray.filter((item) => item !== seatData.seatName);
    }
  }
  /**取得暫存已選取座位*/
  getTempSeatArray(): string[] {
    return this.tempSeatArray;
  }
  /**清空暫存已選取座位*/
  deleteTempSeatArray(): void {
    this.tempSeatArray = [];
  }

  /**刪除購物車資訊(ticket、seat、all) */
  deleteShopCart(key: 'ticket' | 'seat' | 'all'): void {
    if(key=== 'all'){
      this.shopCart = {
        ticket: [],
        seat: [],
        movieId: '',
        title: '',
        scheduleId: ''
      }
      return;
    }
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

  getShopCart(): ShopCartInterface {
    return this.shopCart;
  }
}
