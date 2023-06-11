import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { STATIC_ROUTES } from 'projects/staff/src/app/core/constant/routes.constant';
import { StorageEnum } from 'projects/staff/src/app/core/enums/storage/storage-enum';
import { ShopCartInterface } from 'projects/staff/src/app/core/interface/shop-cart.interface';
import { StorageService } from 'projects/staff/src/app/core/services/storage/storage.service';
import { BookingService } from 'projects/staff/src/app/pages/booking-page/services/booking/booking.service';
import { DialogPaymentMethodComponent } from 'projects/staff/src/app/pages/payment-page/components/dialog-payment-method/dialog-payment-method.component';
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
    private bookingService: BookingService,
    private dialog: MatDialog,
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

    // 跳出彈跳視窗選擇現金付款 or LINE Pay
    this.openDialog();
    // 先取得購物車資料或是只做切換路由
    // this.router.navigate([STATIC_ROUTES.PAYMENT]);
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogPaymentMethodComponent, {
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      // 彈跳式視窗關閉後的處理邏輯
      console.log('Dialog result:', result);
    });

    // 選擇付款項目
    // 目前指開放現金付款 ?pay=1 / LINE PAY ?pay=2

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
