import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { STATIC_ROUTES } from '../../core/constant/routes.constant';
import { BookingService } from './services/booking.service';
import { ScheduleListResData } from '../../api/cinePOS-api';
import { MatDialog } from '@angular/material/dialog';
import { SeatDialogComponent } from '../../features/dialog/components/seat-dialog/seat-dialog.component';
@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.scss']
})
export class BookingPageComponent implements OnInit {

  constructor(
    private router: Router,
    private bookingService: BookingService,
    private matDialog: MatDialog,
  ) { }

  dateCount = 7;
  dateArr: Date[] = [];

  scheduleData: ScheduleListResData[] = [];
  checkScheduleGet = false;
  tempTime = '';

  ngOnInit(): void {
    this.dateArr = this.createDates(this.dateCount);
    this.getScheduleList(String(this.dateArr[0].getTime()));
  }


  getScheduleList($event: string): void {
    this.checkScheduleGet = false;
    this.tempTime = $event;
    this.bookingService.dateSelect$.next($event);
    const startTime = $event;
    const endDate = new Date(Number(startTime));
    endDate.setHours(23, 59, 59, 999);
    const endTime = String(endDate.getTime());
    this.scheduleData = [];
    this.bookingService.v1StaffScheduleListGet$({ startDate: startTime, endDate: endTime })
      .subscribe((res) => {
        this.checkScheduleGet = true;
        this.scheduleData = res.data;
      })
  }

  // 生成日期
  createDates(num: number): Date[] {
    const dateArr: Date[] = [];
    const today = new Date(); // 當前日期和時間
    for (var i = 0; i < num; i++) {
      var date = new Date(today); // 複製當前日期
      date.setDate(today.getDate() + i); // 設定日期為當前日期加上索引值
      date.setHours(0, 0, 0, 0);
      dateArr.push(date);
    }
    return dateArr;
  }

  opneSeatPOP($event: string): void {
    console.log('點選場次:', this.bookingService.getShopCart());
    this.bookingService.v1StaffSeatScheduleIdGet$($event)
      .subscribe((res) => {
        this.matDialog.open(SeatDialogComponent, {
          width: '80%',
          data: res.data
        }
        );
      })

  }
}
