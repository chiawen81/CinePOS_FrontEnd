import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BookingService } from 'projects/staff/src/app/pages/booking-page/services/booking.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-date-select',
  templateUrl: './date-select.component.html',
  styleUrls: ['./date-select.component.scss']
})
export class DateSelectComponent implements OnInit {

  @Input() date = new Date(); // 日期
  @Input() dateIndex = 0; // 日期索引
  @Output() dateEmit = new EventEmitter<string>();

  weekdays = ['日', '一', '二', '三', '四', '五', '六'];

  isActive = false;

  constructor(
    private bookingService:BookingService
  ) { }

  ngOnInit(): void {
    this.dateIndex === 0 ? this.isActive = true: this.isActive = false;

    this.bookingService.dateSelect$
      .pipe(
        takeUntil(this.bookingService.onDestroy$)
      )
      .subscribe((v)=>{
        if(v === String(this.date.getTime())){
          this.isActive = true;
        }else{
          this.isActive = false;
        }
      })
  }

  ngOnDestroy(): void {
    this.bookingService.onDestroy$.next();
  }

  dateOutput(): void{
    this.dateEmit.emit(String(this.date.getTime()));
  }





}
