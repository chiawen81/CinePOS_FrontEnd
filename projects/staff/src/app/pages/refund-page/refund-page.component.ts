import { Component, OnInit } from '@angular/core';
import { RefundService } from './services/refund.service';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { PatchOrderReqInner, PatchSeatReqInner, PatchTicketReqInner, StaffOrderSearchSuccessDataTicketList } from '../../api/cinePOS-api';
import { Subject, takeUntil } from 'rxjs';
import { mongoIdFormatValidator } from '../../core/validators/mongo-id-format.validator';
export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}
export interface CheckboxItem {
  isCheck: boolean;
  data: StaffOrderSearchSuccessDataTicketList;
}

export interface Checkbox {
  item: CheckboxItem[]
}

@Component({
  selector: 'app-refund-page',
  templateUrl: './refund-page.component.html',
  styleUrls: ['./refund-page.component.scss']
})
export class RefundPageComponent implements OnInit {
  form = this.fb.group({
    orderId: ['', [Validators.required,mongoIdFormatValidator()]],
  });


  allCheck: boolean = false;
  allTimeOver: boolean = true;
  allIsRefund: boolean = true;

  validOpen: boolean = false;

  checkData: CheckboxItem[] = [];
  tempOrderId = ''; // 暫存OrderId，後續退票用
  tempAmount = 0; // 暫存目前總金額，後續扣款用
  teamData: CheckboxItem[] = [
    {
      isCheck: true,
      data: {
        title: '關於我和鬼變成家人的那件事',
        ticketId: '6471e9fcbe714b8e2a3dd228',
        ticketType: '優待票',
        ticketStatus: 0,
        price: 280,
        time: '2023-06-12T09:28:00.000Z',
        seatId: '645a2bd0d658869fb83b1b96',
        seatName: 'A8'
      }
    },
    {
      isCheck: false,
      data: {
        title: '關於我和鬼變成家人的那件事',
        ticketId: '6471e9fcbe714b8e2a3dd228',
        ticketType: '優待票',
        ticketStatus: 0,
        price: 280,
        time: '2023-06-12T09:28:00.000Z',
        seatId: '645a2bd0d658869fb83b1b96',
        seatName: 'A8'
      }
    },
    {
      isCheck: false,
      data: {
        title: '關於我和鬼變成家人的那件事',
        ticketId: '6471e9fcbe714b8e2a3dd228',
        ticketType: '優待票',
        ticketStatus: 0,
        price: 280,
        time: '2023-06-12T09:28:00.000Z',
        seatId: '645a2bd0d658869fb83b1b96',
        seatName: 'A8'
      }
    },
    {
      isCheck: false,
      data: {
        title: '關於我和鬼變成家人的那件事',
        ticketId: '6471e9fcbe714b8e2a3dd228',
        ticketType: '優待票',
        ticketStatus: 0,
        price: 280,
        time: '2023-06-12T09:28:00.000Z',
        seatId: '645a2bd0d658869fb83b1b96',
        seatName: 'A8'
      }
    },
    {
      isCheck: false,
      data: {
        title: '關於我和鬼變成家人的那件事',
        ticketId: '6471e9fcbe714b8e2a3dd228',
        ticketType: '優待票',
        ticketStatus: 0,
        price: 280,
        time: '2023-06-12T09:28:00.000Z',
        seatId: '645a2bd0d658869fb83b1b96',
        seatName: 'A8'
      }
    },
    {
      isCheck: false,
      data: {
        title: '關於我和鬼變成家人的那件事',
        ticketId: '6471e9fcbe714b8e2a3dd228',
        ticketType: '優待票',
        ticketStatus: 0,
        price: 280,
        time: '2023-06-12T09:28:00.000Z',
        seatId: '645a2bd0d658869fb83b1b96',
        seatName: 'A8'
      }
    }

  ];
  onDestroy$ = new Subject<void>();
  constructor(
    private refundService: RefundService,
    private fb: UntypedFormBuilder,
  ) { }

  ngOnInit(): void {
    // this.teamData.forEach(item => {
    //   if (this.checkTime(item.data.time)) { this.allTimeOver = false };
    //   if (item.data.ticketStatus !== 1) { this.allIsRefund = false };
    //   this.checkData.push(item)
    // });
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
  }



  // 查詢訂單
  findOrderInfo(): void {
    // 重製狀態
    this.allCheck = false;
    this.allTimeOver = true;
    this.allIsRefund = true;

    if (this.form.invalid) { this.validOpen = true; return ;};
    this.refundService.v1StaffRefundOrderIdGet$(this.form.value.orderId)
      .pipe(
        takeUntil(this.onDestroy$)
      )
      .subscribe((res) => {
        this.checkData = [];
        this.form.controls['orderId'].setValue('');
        this.tempOrderId = res.data?.orderId!;
        this.tempAmount = res.data?.amount!;

        res.data?.ticketList.forEach(item => {
          if (this.checkTime(item.time)) { this.allTimeOver = false };
          if (item.ticketStatus !== 1) { this.allIsRefund = false };
          this.checkData.push(
            {
              isCheck: false,
              data: item
            }
          )
        });
      })
  }
  // 確認退票
  refund(): void {
    if (this.checkDataTrueCount() <= 0) { return; }
    //取得目前打勾的項目
    const refundData = this.checkData
      .filter(item => item.isCheck)
      .map(item => item.data);

    let seatArr: PatchSeatReqInner[] = [];
    let ticketArr: PatchTicketReqInner[] = [];
    let orderArr: PatchOrderReqInner[] = [];
    let payAmount = 0;
    // 整合所有resData
    refundData.forEach(item => {
      seatArr.push({ id: item.seatId, status: 0 });
      ticketArr.push({ id: item.ticketId, isRefund: true, refundMethod: 1 });
      payAmount += item.price;
    });
    // 判斷單筆訂單是否已全退
    if(this.tempAmount - payAmount <= 0 ){
      orderArr.push( { id: this.tempOrderId, status: 3, newAmount: 0 } )
    }else{
      orderArr.push( { id: this.tempOrderId, status: 2, newAmount: this.tempAmount - payAmount } )
    }

    // 更新狀態
    this.refundService.refund$(seatArr,ticketArr,orderArr)
      .pipe(
        takeUntil(this.onDestroy$)
      ).subscribe(()=>{
        this.checkData = [];
        alert('已完成退票!');
      })

  }

  // 判斷目前打勾數量
  checkDataTrueCount(): number {
    return this.checkData.filter((item) => item.isCheck).length;
  }


  // 更新全部選取
  updateAllCheck() {
    this.allCheck = this.checkData != null && this.checkData.every(item => item.isCheck);
  }

  // 點選部分
  someCheck(): boolean {
    if (this.checkData == null) {
      return false;
    }
    return this.checkData.filter(item => item.isCheck).length > 0 && !this.allCheck;
  }
  // 點選全部(若全已退或全過時間則不顯示)
  setAll(check: boolean) {
    this.allCheck = check;
    if (this.checkData == null) {
      return;
    }
    this.checkData.forEach(item => {
      if (item.data.ticketStatus !== 1 && this.checkTime(item.data.time)) {
        item.isCheck = check
      }
    });
  }

  // 判斷是否在開演前30分鐘(否則無法退票)
  checkTime(timeString: string): boolean {
    const time = new Date(timeString);
    const currentTime = new Date();
    const timeDiff = time.getTime() - currentTime.getTime();
    const minutesDiff = Math.floor(timeDiff / (1000 * 60));
    if (minutesDiff >= 30) {
      return true;
    } else {
      return false;
    }
  }
}
