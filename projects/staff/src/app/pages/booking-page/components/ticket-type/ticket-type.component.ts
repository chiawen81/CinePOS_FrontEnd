import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { STATIC_ROUTES } from 'projects/staff/src/app/core/constant/routes.constant';
import { ticketInterface } from 'projects/staff/src/app/core/interface/shop-cart.interface';
import { BookingService } from '../../services/booking/booking.service';
interface TicketSelect {
  isAdd: boolean;
  ticketTypeId: string;
}
@Component({
  selector: 'app-ticket-type',
  templateUrl: './ticket-type.component.html',
  styleUrls: ['./ticket-type.component.scss']
})
export class TicketTypeComponent implements OnInit {
  constructor(
    private router: Router,
    private bookingService: BookingService
  ) { }
  /**票種資料 */
  ticketTypeData: any[] = [];
  /**已選取票 */
  ticketData: ticketInterface[] = [];

  ngOnInit(): void {
    // call API 取的票種
    this.ticketTypeData = [
      {
        _id: '6460a7626b1ed843a113b9b6',
        type: '全票',
        price: 280
      },
      {
        _id: '6460a7866b1ed843a113b9b9',
        type: '優待票',
        price: 230
      },
    ]
  }

  ticketControl($event: TicketSelect): void {
    // 新增票
    if ($event.isAdd) {
      const addData = this.ticketTypeData.find(item => item['_id'] === $event.ticketTypeId);
      this.ticketData.push({
        ticketId: '',
        ticketTypeId: addData['_id'],
        ticketType: addData.type,
        price: addData.price
      })
    } else { // 刪除票
      const reduceIndex = this.ticketData.findIndex(function (ticket) {
        return ticket.ticketTypeId === $event.ticketTypeId;
      });
      if (reduceIndex !== -1) {
        this.ticketData.splice(reduceIndex, 1);
      }
    }

    console.log('ticketData', this.ticketData);
  }
  goSelectSeat(): void {
    if (this.ticketData.length <= 0) {
      alert('請選擇票種&票數');
      return;
    }
    // 先刪除歷史選到的票
    this.bookingService.deleteArr('ticket');
    // 將目前選擇的票寫入shopCart
    this.ticketData.forEach(item => {
      this.bookingService.setShopCart('ticket', item)
    });
    console.log('選則票種後:',this.bookingService.getShopCart());
    // 將選取的票種&票數存進services
    this.router.navigate(
      [`/${STATIC_ROUTES.BOOKING.ROOT}/${STATIC_ROUTES.BOOKING.SELECT_SEAT}`]
    );
  }
}
