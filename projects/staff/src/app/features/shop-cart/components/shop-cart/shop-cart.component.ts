import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { STATIC_ROUTES } from 'projects/staff/src/app/core/constant/routes.constant';
import { StorageEnum } from 'projects/staff/src/app/core/enums/storage/storage-enum';
import { ShopCartInterface } from 'projects/staff/src/app/core/interface/shop-cart.interface';
import { StorageService } from 'projects/staff/src/app/core/services/storage/storage.service';
import { BookingService } from 'projects/staff/src/app/pages/booking-page/services/booking.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.scss']
})
export class ShopCartComponent implements OnInit {

  constructor(
    private router: Router,
    private storageService: StorageService,
    private bookingService: BookingService
  ) { }

  STATIC_ROUTES = STATIC_ROUTES;
  shopCartData: ShopCartInterface[] = [];

  ngOnInit(): void {
    this.getShopCartData();

    this.bookingService.shopCartSelect$

      .subscribe(() => {
        this.getShopCartData();
      })
  }
  goPayment(): void {
    // 先取得購物車資料或是只做切換路由
    this.router.navigate([STATIC_ROUTES.PAYMENT]);
  }

  getShopCartData(): void {
    this.shopCartData = this.storageService.getLocalStorage(StorageEnum.shopCartData) as ShopCartInterface[];
  }
  deleteShopCart($event: number) {
    this.bookingService.setShopCartToLocal(false, $event);
  }

  getTotal(): number {
    let total = 0;
    if (!!this.shopCartData) {
      this.shopCartData.forEach(dataItem => {
        dataItem.ticket.forEach(ticketItem => {
          total += ticketItem.price;
        });
      });
    }
    return total;
  }
}
