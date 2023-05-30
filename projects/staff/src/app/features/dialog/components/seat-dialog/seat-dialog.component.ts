import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SeatRes } from 'projects/staff/src/app/api/cinePOS-api';
import { STATIC_ROUTES } from 'projects/staff/src/app/core/constant/routes.constant';
import { BookingService } from 'projects/staff/src/app/pages/booking-page/services/booking/booking.service';

@Component({
  selector: 'app-seat-dialog',
  templateUrl: './seat-dialog.component.html',
  styleUrls: ['./seat-dialog.component.scss']
})
export class SeatDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public seatData: any, // API 規格待調整
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  goTicketType(): void {
    // 將選取的票種&票數存進services
    this.router.navigate(
      [`/${STATIC_ROUTES.BOOKING.ROOT}/${STATIC_ROUTES.BOOKING.TICKET_TYPE}`]
    );
  }

}
