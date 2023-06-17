import { Component, Input, OnInit } from '@angular/core';
import { BookingService } from 'projects/staff/src/app/pages/booking-page/services/booking.service';
interface SeatData {
  seatName: string;
  isActive: boolean;
}
@Component({
  selector: 'app-seatchart',
  templateUrl: './seatchart.component.html',
  styleUrls: ['./seatchart.component.scss']
})
export class SeatchartComponent implements OnInit {

  @Input() seatData: any = {};
  @Input() isPreview:boolean = true;
  @Input() seatSelectCounts = 0;

  remainSeat = this.bookingService.getShopCart().ticket.length;
  constructor(
    private bookingService:BookingService
  ) { }
  noneSeat = {
    "cols": "",
    "status": 0,
    "type": "N"
  };
  seatArray: string[] = [];

  ngOnInit(): void {
  }
  ngOnChanges(): void {
    this.remainSeat = this.bookingService.getShopCart().ticket.length;
  }

  changeSeatArray($event: SeatData): void {
    this.bookingService.changeTempSeatArray($event);
    this.remainSeat = this.bookingService.getShopCart().ticket.length - this.bookingService.getTempSeatArray().length;
  }
}
