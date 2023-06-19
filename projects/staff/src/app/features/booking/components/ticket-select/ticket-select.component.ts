import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ticketInterface } from 'projects/staff/src/app/core/interface/shop-cart.interface';
import { TicketTypeResData } from 'projects/staff/src/app/core/interface/ticketTypeResData';
interface TicketSelect {
  isAdd: boolean;
  ticketTypeId: string;
}

@Component({
  selector: 'app-ticket-select',
  templateUrl: './ticket-select.component.html',
  styleUrls: ['./ticket-select.component.scss']
})
export class TicketSelectComponent implements OnInit {

  @Input() ticketItem: TicketTypeResData = {
    _id: '',
    type: '',
    price: 0
  }
  @Output() ticketControl = new EventEmitter<TicketSelect>();

  ticketCounts = 0;
  constructor() { }

  ngOnInit(): void {
  }

  changeTicketCounts(count: number): void {
    if (count > 0 && this.ticketCounts === 10) {
      return;
    }
    if (count < 0 && this.ticketCounts === 0) {
      return
    }
    this.ticketControl.emit({
      isAdd: count > 0 ? true : false,
      ticketTypeId: this.ticketItem._id
    })
    this.ticketCounts += count;
  }

}
