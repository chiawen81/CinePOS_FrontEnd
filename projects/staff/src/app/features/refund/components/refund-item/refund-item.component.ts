import { Component, Input, OnInit } from '@angular/core';
import { StaffOrderSearchSuccessDataTicketList } from 'projects/staff/src/app/api/cinePOS-api';

@Component({
  selector: 'app-refund-item',
  templateUrl: './refund-item.component.html',
  styleUrls: ['./refund-item.component.scss']
})
export class RefundItemComponent implements OnInit {
  @Input() data: StaffOrderSearchSuccessDataTicketList = {
    title: '',
    ticketId: '',
    ticketType: '',
    ticketStatus: 0,
    price: 0,
    time: '',
    seatId: '',
    seatName: ''
  }
  constructor() { }
  ngOnInit(): void {
  }

}
