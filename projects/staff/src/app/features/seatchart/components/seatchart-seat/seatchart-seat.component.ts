import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BookingService } from 'projects/staff/src/app/pages/booking-page/services/booking.service';

interface SeatStyle {
  width: string;
  height: string;
}

@Component({
  selector: 'app-seatchart-seat',
  templateUrl: './seatchart-seat.component.html',
  styleUrls: ['./seatchart-seat.component.scss']
})

export class SeatchartSeatComponent implements OnInit {
  constructor(
    private bookingService: BookingService
  ) { }
  @Input() rows: string = '';
  @Input() cols: string = '';
  @Input() seatData: any = {};
  @Input() isPreview: boolean = false;

  isActive: boolean = false;
  @Output() activeOut = new EventEmitter<any>();

  ngOnInit(): void {

  }

  active(): void {
    if (!this.isPreview) {
      const ticketArr = this.bookingService.getShopCart().ticket;
      const tempSeatArr = this.bookingService.getTempSeatArray();
      if(!this.isActive){
        if(ticketArr.length > tempSeatArr.length){
          this.isActive = !this.isActive;
          this.activeOut.emit(
            {
              seatName: this.rows + this.seatData.cols,
              isActive: this.isActive
            }
          );
        }
      }else{
        this.isActive = !this.isActive;
          this.activeOut.emit(
            {
              seatName: this.rows + this.seatData.cols,
              isActive: this.isActive
            }
          );
      }
    }

  }
  ngOnChanges(): void {
  }

}
