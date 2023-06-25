import { Component, OnDestroy, OnInit, Pipe, PipeTransform } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from './services/orders.service';
import { DialogOrderDetailComponent } from './components/dialog-order-detail/dialog-order-detail.component';
import { ActivatedRoute } from '@angular/router';
import { StaffOrderCreateReq } from '../../api/cinePOS-api';
import { ShopCartInterface } from '../../core/interface/shop-cart.interface';
import { StorageEnum } from '../../core/enums/storage/storage-enum';
import { StorageService } from '../../core/services/storage/storage.service';
import { Subject, takeUntil } from 'rxjs';

@Pipe({ name: 'customCurrency' })
export class CustomCurrencyPipe implements PipeTransform {
  transform(value: number): string {
    // 將數值轉換為整數
    const intValue = Math.floor(value);
    // 將整數轉換為字符串
    const stringValue = intValue.toString();
    // 格式化貨幣數值（例如：1000 => 1,000）
    const formattedValue = stringValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return formattedValue;
  }
}
@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss']
})
export class PaymentPageComponent implements OnInit,OnDestroy {

  payMethod = 0;

  payTotal:number = 0;
  payString:string = '';

  // 訂單資料格式
  staffOrderCreateReq: StaffOrderCreateReq = {
    /*** 付款方式(1:現金,2:Line Pay) */
    paymentMethod: 1,
    /***  訂單總金額 */
    amount: 0,
    ticketList: []
  };
  shopCar?:ShopCartInterface[];

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private orderService: OrderService,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.payMethod = params['id'];
      console.log(this.payMethod); // 印出參數的值
    });

    /** 取得購物車資料 */
    this.shopCar = this.storageService.getLocalStorage(StorageEnum.shopCartData) as ShopCartInterface[];

    /** 取得訂單資料 */
    this.getOrder();
  }

  /** 計算訂單金額 */
  getSubtotal(): number{
    let subtotal = 0;
    this.shopCar?.forEach(data => {
      data.ticket.forEach(item => {
        subtotal += item.price;
      });
    });

    return subtotal;
  }

  /** 計算找零金額 */
  getPayBack(): number{
    return (this.payTotal!= 0) ? this.payTotal - this.getSubtotal() : 0 ;
  }

  /** 取得訂單資料 */
  getOrder(): void{

    this.staffOrderCreateReq = {
      /*** 付款方式(1:現金,2:Line Pay) */
      paymentMethod: 1,
      /***  訂單總金額 */
      amount: 0,
      ticketList: []
    };

    this.staffOrderCreateReq.amount = this.getSubtotal();

    this.shopCar?.forEach(item => {
      /** 購物車訂單筆數 */

        const tickets = item.ticket;
        const seats = item.seat;

        for (let i = 0; i < Math.min(tickets.length, seats.length); i++) {
          const ticket = tickets[i];
          const seat = seats[i];

          const newData = {
            ticketId: ticket.ticketId,
            price: ticket.price,
            ticketTypeId: ticket.ticketTypeId,
            movieId: item.movieId,
            scheduleId: item.scheduleId,
            seatId: seat.seatId,
            seatName: seat.seatName
          };

          this.staffOrderCreateReq.ticketList.push(newData);
         console.log('迴圈筆數', i );
         console.log('迴圈茲裡', newData);
        }


      // console.log(result);

      // const item = {
      //     "ticketId" : data.ticket[i].ticketId,
      //     "price" : data.ticket[i].price,
      //     "ticketTypeId": data.ticket[i].ticketTypeId,
      //     "movieId": data.movieId,
      //     "scheduleId": data.scheduleId,
      //     "seatName": data.seat[i].seatName
      // };
      // i++;
      // this.staffOrderCreateReq.ticketList.push(item);
    });

    console.log('ticketList', this.staffOrderCreateReq);
  }

  /** 現金付款 */
  openDialog() {

    this.getOrder();
    /** 檢查localstorage訂單資料 */
    if (!!this.staffOrderCreateReq) {

      /** 檢查付款金額是否大於訂單金額 */
      if(this.payTotal >= this.getSubtotal()){

        const data = this.staffOrderCreateReq;

        /** 本地端暫時模擬資料才會打得過 */
        // const data =  {
        //   "ticketList" : [
        //       {
        //           "ticketId" : "6471e9fcbe714b8e2a3dd231",
        //           "price" : 280,
        //           "ticketTypeId":"6460a7626b1ed843a113b9b6",
        //           "movieId":"645869f668d71390eba143d3",
        //            "scheduleId":"646a0b3091a4e35d3806be4e",
        //            "seatName":"C16"
        //       },
        //       {
        //           "ticketId" : "6460a7626b1ed843a113b9b6",
        //           "price" : 280,
        //           "ticketTypeId":"6460a7626b1ed843a113b9b6",
        //           "movieId":"645869f668d71390eba143d3",
        //            "scheduleId":"646a0b3091a4e35d3806be4e",
        //            "seatName":"D16"
        //       }
        //   ],
        //   "paymentMethod" : 1,
        //   "amount" : 560
        // };

        /** 送出訂單 */
        this.orderService.generateOrder(this.staffOrderCreateReq)
        .pipe(
          takeUntil(this.destroy$)
        )
        .subscribe(order => {
          console.log('order', order);
          /** 送出訂單成功 */
          if(order.code === 1){
            const dialogRef = this.dialog.open(DialogOrderDetailComponent, {
              width: '800px',
              data: order
            });

            /** 清除購物車 */
            this.storageService.removeLocalStorage(StorageEnum.shopCartData);


            dialogRef.afterClosed().subscribe(result => {
              /** 彈跳式視窗關閉後的處理邏輯 */
              console.log('Dialog result:', result);
              /** 刷新頁面 */
              this.reloadPage();
            });

          }else{
            /** 送出訂單失敗 */
            alert(order.message);
          }
        });
      }else{
        /** 付款金額不足 */
        alert('付款金額不足, 請輸入付款金額');
        console.log('shopCartData 不存在於 Local Storage 中');
      }
    } else {
      /** 購物車為空 */
      alert('購物車為空, 請重新選擇商品');
      console.log('shopCartData 不存在於 Local Storage 中');
    }
  }

  /** 刷新頁面 */
  reloadPage(): void {
    location.reload();
  }

  /** 文字轉數字 */
  convertToNumber(text: string): number {
    return parseInt(text, 10);
  }

  /** 數字轉文字 */
  convertToString(number: number): string {
    return number.toString();
  }

  /** 計算機 */
  calculate(value: any, method: string): void{
    if(!value) return;
    if(method === 'str'){
      /** 拼湊字串 */
      this.payString += value;
      this.payTotal = this.convertToNumber(this.payString);
    }else if(method === 'method'){

      if(value === 'remove'){
        // 刪除鍵
        const str = this.payString;
        const newStr = str.substring(0, str.length - 1);
        console.log(newStr); // 输出 "Hello Worl"
        this.payString = newStr;
        this.payTotal = parseInt(this.payString)
      }else{
        /** 歸零 */
        this.payTotal = 0;
        this.payString = this.convertToString(this.payTotal);
      }
    }else if(method === 'number'){
      /** 直接加減 */
      const numbeValue = this.convertToNumber(value);
      this.payTotal = this.payTotal + numbeValue;
      this.payString = this.payTotal.toString();
    }else{
      /** 例外狀況 */
    }

    /** 輸入付款金額 */
    if(this.payTotal > 100000){
      alert('付款金額不得大於100,000元');

      // 清付款款金額
      // this.calculate('zero', 'method');
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
