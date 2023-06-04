import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-order-detail',
  templateUrl: './dialog-order-detail.component.html',
  styleUrls: ['./dialog-order-detail.component.scss']
})
export class DialogOrderDetailComponent implements OnInit {

    // {
    //   "code": 1,
    //   "message": "成功結帳!",
    //   "data": {
    //     "status": 1,
    //     "orderId": "202305172236200001",
    //     "paymentMethod": 1,
    //     "amount": 280,
    //     "ticketList": [
    //       {
    //         "ticketId": "202305172236200001",
    //         "type": "全票",
    //         "seatName": "A17"
    //       }
    //     ]
    //   }
    // }


    // {
    //   "code": -1,
    //   "message": "系統發生錯誤!"
    // }


    order: any;
    ticketList: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogOrderDetailComponent>,

  ) {

    console.log('data', data);
  }



  ngOnInit(): void {
    this.ticketList = this.data.data.ticketList;
    this.order = this.data;
    console.log('ticketList', this.ticketList);
  }

  onClose() {
    this.dialogRef.close();
  }

  onPrint() {
    // 執行列印的邏輯
    // ...
  }

}
