import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from './services/orders.service';
import { DialogOrderDetailComponent } from './components/dialog-order-detail/dialog-order-detail.component';
import { ActivatedRoute } from '@angular/router';
import { StaffOrderCreateReq } from '../../api/cinePOS-api';
import { ShopCartInterface } from '../../core/interface/shop-cart.interface';
import { StorageEnum } from '../../core/enums/storage/storage-enum';
import { StorageService } from '../../core/services/storage/storage.service';

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
export class PaymentPageComponent implements OnInit {

  payMethod = 0;
  payTotal:number = 1000;
  payString:string = '';
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
  }

  openDialog() {

    // 取得localstorage訂單資料

   const shopCartData = this.storageService.getLocalStorage(StorageEnum.shopCartData) as ShopCartInterface[];

    if (!!shopCartData) {

      shopCartData.forEach((item: any) => {
        console.log( 'item' , item);
      });
      console.log('解析後的直',shopCartData); // 輸出解析後的值
    } else {
      alert('購物車為空, 請重新選擇商品');
      console.log('shopCartData 不存在於 Local Storage 中');
    }



    const staffOrderCreateReq: StaffOrderCreateReq = {
      /**
       * 付款方式(1:現金,2:Line Pay)
       */
      paymentMethod: 1,
      /**
       *  訂單總金額
       */
      amount: 0,
      ticketList: []
    };

    // 送出訂單

    this.orderService.generateOrder(staffOrderCreateReq).subscribe(order => {

      console.log('order', order);
      if(order.code === 1){
        const dialogRef = this.dialog.open(DialogOrderDetailComponent, {
          width: '800px',
          data: order
        });

        dialogRef.afterClosed().subscribe(result => {
          // 彈跳式視窗關閉後的處理邏輯
          console.log('Dialog result:', result);
        });

      }else{

      }

    });
  }


  openOder():void{
    // this.orderService.generateOrder().subscribe(order => {
    //   console.log('訂單資料:', order);
    // });
  }

  calculate(number: any, method: string): void{

    if(!number) return;
    if(method === 'str'){
      //拼湊字串
    }else if(method === 'zero'){
      // 歸零

    }else if(method === 'remove'){
      // 移除

    }else if(method === 'pay'){
      // 直接替換
    }else{
      // 例外狀況

    }

    switch(number){
      case 'zero':
        break;

      case 'remove':
        break;

      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '0':
        break;
    }
  }

}
