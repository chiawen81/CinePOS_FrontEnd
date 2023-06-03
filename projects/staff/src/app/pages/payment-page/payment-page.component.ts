import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from './services/orders.service';
import { DialogOrderDetailComponent } from './components/dialog-order-detail/dialog-order-detail.component';
import { ActivatedRoute } from '@angular/router';

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
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.payMethod = params['id'];
      console.log(this.payMethod); // 印出參數的值
    });
  }

  openDialog() {

    // 取得訂單資料

    // 送出訂單

    this.orderService.generateOrder().subscribe(order => {
      const dialogRef = this.dialog.open(DialogOrderDetailComponent, {
        width: '800px',
        data: order
      });

      dialogRef.afterClosed().subscribe(result => {
        // 彈跳式視窗關閉後的處理邏輯
        console.log('Dialog result:', result);
      });
    });
  }


  openOder():void{
    this.orderService.generateOrder().subscribe(order => {
      console.log('訂單資料:', order);
    });
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
