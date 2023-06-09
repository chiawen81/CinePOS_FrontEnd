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

  task: Task = {
    name: '全選',
    completed: false,
    color: 'primary',
    subtasks: [
      { name: 'Accent1', completed: false, color: 'accent' },
      { name: 'Accent2', completed: false, color: 'accent' },
      { name: 'Accent3', completed: false, color: 'accent' },
      { name: 'Accent4', completed: false, color: 'accent' },
    ],
  };
  allCheck: boolean = false;

  checkData: CheckboxItem[] = [];

  constructor(
    private refundService: RefundService,
    private fb: UntypedFormBuilder,
  ) { }

  ngOnInit(): void {
    // this.checkData = [
    //   {
    //     isCheck: false,
    //     data: {
    //       title: '關於我和鬼變成家人的那件事',
    //       ticketId: '6471e9fcbe714b8e2a3dd228',
    //       ticketType: '優待票',
    //       ticketStatus: 0,
    //       price: 280,
    //       time: '2023-06-06T02:30:00.000Z',
    //       seatId: '645a2bd0d658869fb83b1b96',
    //       seatName: 'A8'
    //     }
    //   },
    //   {
    //     isCheck: false,
    //     data: {
    //       title: '關於我和鬼變成家人的那件事',
    //       ticketId: '6471e9fcbe714b8e2a3dd228',
    //       ticketType: '優待票',
    //       ticketStatus: 0,
    //       price: 280,
    //       time: '2023-06-06T02:30:00.000Z',
    //       seatId: '645a2bd0d658869fb83b1b96',
    //       seatName: 'A8'
    //     }
    //   },
    //   {
    //     isCheck: false,
    //     data: {
    //       title: '關於我和鬼變成家人的那件事',
    //       ticketId: '6471e9fcbe714b8e2a3dd228',
    //       ticketType: '優待票',
    //       ticketStatus: 0,
    //       price: 280,
    //       time: '2023-06-06T02:30:00.000Z',
    //       seatId: '645a2bd0d658869fb83b1b96',
    //       seatName: 'A8'
    //     }
    //   },
    //   {
    //     isCheck: false,
    //     data: {
    //       title: '關於我和鬼變成家人的那件事',
    //       ticketId: '6471e9fcbe714b8e2a3dd228',
    //       ticketType: '優待票',
    //       ticketStatus: 0,
    //       price: 280,
    //       time: '2023-06-06T02:30:00.000Z',
    //       seatId: '645a2bd0d658869fb83b1b96',
    //       seatName: 'A8'
    //     }
    //   },
    //   {
    //     isCheck: false,
    //     data: {
    //       title: '關於我和鬼變成家人的那件事',
    //       ticketId: '6471e9fcbe714b8e2a3dd228',
    //       ticketType: '優待票',
    //       ticketStatus: 0,
    //       price: 280,
    //       time: '2023-06-06T02:30:00.000Z',
    //       seatId: '645a2bd0d658869fb83b1b96',
    //       seatName: 'A8'
    //     }
    //   },
    //   {
    //     isCheck: false,
    //     data: {
    //       title: '關於我和鬼變成家人的那件事',
    //       ticketId: '6471e9fcbe714b8e2a3dd228',
    //       ticketType: '優待票',
    //       ticketStatus: 0,
    //       price: 280,
    //       time: '2023-06-06T02:30:00.000Z',
    //       seatId: '645a2bd0d658869fb83b1b96',
    //       seatName: 'A8'
    //     }
    //   },
    //   {
    //     isCheck: false,
    //     data: {
    //       title: '關於我和鬼變成家人的那件事',
    //       ticketId: '6471e9fcbe714b8e2a3dd228',
    //       ticketType: '優待票',
    //       ticketStatus: 0,
    //       price: 280,
    //       time: '2023-06-06T02:30:00.000Z',
    //       seatId: '645a2bd0d658869fb83b1b96',
    //       seatName: 'A8'
    //     }
    //   }
    // ]
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
          this.checkData.push(
            {
              isCheck: false,
              data: item
            }
          )
        });
      })
  }

  updateAllComplete1() {
    this.allCheck = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }
  updateAllComplete() {
    this.allCheck = this.checkData != null && this.checkData.every(item => item.isCheck);
  }

  someCheck1(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allCheck;
  }
  someCheck(): boolean {
    if (this.checkData == null) {
      return false;
    }
    return  this.checkData.filter(item => item.isCheck).length > 0 && !this.allCheck;
  }

  setAll1(completed: boolean) {
    this.allCheck = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => (t.completed = completed));
  }

  setAll(check: boolean) {
    this.allCheck = check;
    if (this.checkData == null) {
      return;
    }
    this.checkData.forEach(item => (item.isCheck = check));
  }
}
