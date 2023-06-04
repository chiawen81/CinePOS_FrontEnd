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
    this.shopCar = this.storageService.getLocalStorage(StorageEnum.shopCartData) as ShopCartInterface[];

    this.getOrder();
    console.log('總金額', this.getSubtotal());
  }

  getSubtotal(): number{
    let subtotal = 0;
    this.shopCar?.forEach(data => {
      data.ticket.forEach(item => {
        subtotal += item.price;
      });
    });

    return subtotal;
  }

  getPayBack(): number{
    return (this.payTotal!= 0) ? this.payTotal - this.getSubtotal() : 0 ;
  }

  getOrder(): void{

    this.staffOrderCreateReq.amount = this.getSubtotal();

    this.shopCar?.forEach(data => {
      data.ticket.forEach(item => {
        this.staffOrderCreateReq.ticketList.push(item);
      });
    });

    console.log('ticketList', this.staffOrderCreateReq);

  }

  openDialog() {
    // 檢查localstorage訂單資料
    if (!!this.staffOrderCreateReq) {
      // 檢查是否已付款
    } else {
      alert('購物車為空, 請重新選擇商品');
      console.log('shopCartData 不存在於 Local Storage 中');
    }

    // 送出訂單
    this.orderService.generateOrder(this.staffOrderCreateReq).subscribe(order => {

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

      }else{}
    });
  }

  convertToNumber(text: string): number {
    return parseInt(text, 10);
  }

  convertToString(number: number): string {
    return number.toString();
  }

  calculate(value: any, method: string): void{
    if(!value) return;
    if(method === 'str'){
      //拼湊字串
      this.payString += value;
      this.payTotal = this.convertToNumber(this.payString);
    }else if(method === 'method'){
      // 歸零
      this.payTotal = 0;
      this.payString = this.convertToString(this.payTotal);
    }else if(method === 'number'){
      // 直接加減
      const numbeValue = this.convertToNumber(value);
      this.payTotal = this.payTotal + numbeValue;
      this.payString = this.payTotal.toString();
    }else{
      // 例外狀況
    }
  }

}
