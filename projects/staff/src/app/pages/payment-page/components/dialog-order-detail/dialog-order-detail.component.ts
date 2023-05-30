import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-order-detail',
  templateUrl: './dialog-order-detail.component.html',
  styleUrls: ['./dialog-order-detail.component.scss']
})
export class DialogOrderDetailComponent implements OnInit {
  data = {
    orderNumber: 'ORD123',
    products: [
      {
        id: 'P001',
        name: 'Product 1',
        price: 10
      },
      {
        id: 'P002',
        name: 'Product 2',
        price: 15
      }
    ]
  };

  constructor(private dialogRef: MatDialogRef<DialogOrderDetailComponent>) { }



  ngOnInit(): void {
  }

  onClose() {
    this.dialogRef.close();
  }

  onPrint() {
    // 執行列印的邏輯
    // ...
  }

}
