import { Component, OnInit } from '@angular/core';
import { RefundService } from './services/refund.service';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { StaffOrderSearchSuccessDataTicketList } from '../../api/cinePOS-api';
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
    orderId: ['', [Validators.required]],
  });


  allCheck: boolean = false;
  allTimeOver: boolean = true;
  allIsRefund: boolean = true;

  checkData: CheckboxItem[] = [];
  teamData: CheckboxItem[] = [
    {
      isCheck: false,
      data: {
        title: '關於我和鬼變成家人的那件事',
        ticketId: '6471e9fcbe714b8e2a3dd228',
        ticketType: '優待票',
        ticketStatus: 1,
        price: 280,
        time: '2023-06-06T02:30:00.000Z',
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

  ]
  constructor(
    private refundService: RefundService,
    private fb: UntypedFormBuilder,
  ) { }

  ngOnInit(): void {
    this.teamData.forEach(item => {
      if (this.checkTime(item.data.time)) { this.allTimeOver = false };
      if (item.data.ticketStatus !== 1) { this.allIsRefund = false };

      this.checkData.push(item)
    });
    console.log(this.allTimeOver);
  }

  tt(): void {
    console.log(this.checkData);
  }

  findOrderInfo(): void {
    if (this.form.invalid) { return };
    this.refundService.v1StaffRefundOrderIdGet$(this.form.value.orderId)
      .subscribe((res) => {
        this.checkData = [];
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
        this.form.controls['orderId'].setValue('');
      })
  }

  updateAllCheck() {
    this.allCheck = this.checkData != null && this.checkData.every(item => item.isCheck);
  }

  someCheck(): boolean {
    if (this.checkData == null) {
      return false;
    }
    return this.checkData.filter(item => item.isCheck).length > 0 && !this.allCheck;
  }

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


  checkTime(timeString: string): boolean {
    const time = new Date(timeString);
    const currentTime = new Date();
    const timeDiff = time.getTime() - currentTime.getTime();
    const minutesDiff = Math.floor(timeDiff / (1000 * 60));
    if (minutesDiff > 30) {
      return true;
    } else {
      return false;
    }
  }
}
