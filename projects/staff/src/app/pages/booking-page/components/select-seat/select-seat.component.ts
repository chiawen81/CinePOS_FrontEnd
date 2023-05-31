import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking/booking.service';
import { filter, tap } from 'rxjs';
import { Router } from '@angular/router';
import { STATIC_ROUTES } from 'projects/staff/src/app/core/constant/routes.constant';

@Component({
  selector: 'app-select-seat',
  templateUrl: './select-seat.component.html',
  styleUrls: ['./select-seat.component.scss']
})
export class SelectSeatComponent implements OnInit {
  seatData: any = {}
  constructor(
    private bookingService: BookingService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getSeatData();
  }

  getSeatData(): void {
    const shopCart = this.bookingService.getShopCart();
    this.bookingService.v1StaffSeatScheduleIdGet$(shopCart.scheduleId)
      .subscribe((res) => {
        this.seatData = res.data;
      })
  }
  complete(): void {
    const tempSeatArray = this.bookingService.getTempSeatArray();
    const shopCart = this.bookingService.getShopCart();
    if (shopCart.ticket.length - tempSeatArray.length > 0) {
      return;
    }
    this.bookingService.v1StaffSeatCheckLockPost$()
      .pipe(
        tap(res => {
          if (res.code !== 1) {
            this.bookingService.deleteTempSeatArray();
            this.getSeatData();
            alert(res.message);
          }
        }),
        filter(res => res.code === 1)
      ).subscribe((res) => {
        console.log(res);
        // // 將目前選擇的座位寫入shopCart
        res.data.forEach(item => {
          this.bookingService.setShopCart('seat', item)
        });
        this.bookingService.deleteTempSeatArray();
        this.bookingService.v1StaffTicketPost$()
          .subscribe((res)=>{
            const ticket = shopCart.ticket.map((obj, index) => {
              return {
                ...obj,
                ticketId: res.data[index]
              };
            });
            // 先刪除歷史選到的票
            this.bookingService.deleteArr('ticket');
            ticket.forEach(item => {
              this.bookingService.setShopCart('ticket', item)
            });
          })
        this.bookingService.setShopCartToLocal(true);
        this.router.navigate(
          [`/${STATIC_ROUTES.BOOKING.ROOT}`]
        );
        console.log('ShopCart2',this.bookingService.getShopCart());
        this.bookingService.deleteArr('seat');
        this.bookingService.deleteArr('ticket');
      })
  }


}
