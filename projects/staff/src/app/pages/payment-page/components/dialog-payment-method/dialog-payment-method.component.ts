import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { STATIC_ROUTES } from 'projects/staff/src/app/core/constant/routes.constant';

@Component({
  selector: 'app-dialog-payment-method',
  templateUrl: './dialog-payment-method.component.html',
  styleUrls: ['./dialog-payment-method.component.scss']
})
export class DialogPaymentMethodComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogPaymentRef: MatDialogRef<DialogPaymentMethodComponent>,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  onClose() {
    this.dialogPaymentRef.close();
  }

  onCash(){
    // 現金支付
    this.router.navigate([STATIC_ROUTES.PAYMENT], { queryParams: { id: 1 } });
    this.onClose();
  }

  onPrint() {
    // 執行列印的邏輯
    // ...
  }

}
