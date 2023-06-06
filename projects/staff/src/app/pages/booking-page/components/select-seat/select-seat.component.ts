import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking/booking.service';
import { catchError, concatMap, filter, tap, throwError } from 'rxjs';
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
        catchError(err => {
          return throwError(err);
        }),
        tap(
          (res) => {
            // 將目前選擇的座位寫入shopCart
            res.data.forEach(item => {
              this.bookingService.setShopCart('seat', item)
            });
            this.bookingService.deleteTempSeatArray();
          },
          (err) => {
            this.getSeatData();
            this.bookingService.deleteTempSeatArray();
          }
        ),
        filter(res => res.code === 1),
        concatMap(() => {
          return this.bookingService.v1StaffTicketPost$()
        })
      ).subscribe((res) => {
        const ticket = shopCart.ticket.map((obj, index) => {
          return {
            ...obj,
            ticketId: res.data[index]
          };
        });
        this.bookingService.deleteShopCart('ticket');
        ticket.forEach(item => {
          this.bookingService.setShopCart('ticket', item)
        });
        console.log('劃位完後', this.bookingService.getShopCart());
        this.bookingService.setShopCartToLocal(true);
        this.router.navigate(
          [`/${STATIC_ROUTES.BOOKING.ROOT}`]
        );
      });
  }


}
