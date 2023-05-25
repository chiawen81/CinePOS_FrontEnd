import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { STATIC_ROUTES } from '../../core/constant/routes.constant';
import { BookingService } from './services/booking/booking.service';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.scss']
})
export class BookingPageComponent implements OnInit {

  constructor(
    private router: Router,
    private bookingService:BookingService
  ) { }

  dateCount = 7;
  dateArr: Date[] = [];

  ngOnInit(): void {

    this.dateArr = this.createDates(this.dateCount);
    var currentDate = new Date(); // 當前日期和時間

    // 取得日期部分（YYYY-MM-DD）
    var formattedDate = currentDate.toISOString().split('T')[0];

    // 轉換為時間戳記
    var timestamp = Date.parse(formattedDate);
    console.log(new Date(timestamp).getHours() - 8);

  }
  goTicketType(): void {
    // 將選取的票種&票數存進services
    this.router.navigate(
      [`/${STATIC_ROUTES.BOOKING.ROOT}/${STATIC_ROUTES.BOOKING.TICKET_TYPE}`]
    );
  }

  getScheduleList($event: string): void {
    this.bookingService.dateSelect$.next($event);
  }

  // 生成日期
  createDates(num: number): Date[] {
    const dateArr:Date[] = [];
    const today = new Date(); // 當前日期和時間
    for (var i = 0; i < num; i++) {
      var date = new Date(today); // 複製當前日期
      date.setDate(today.getDate() + i); // 設定日期為當前日期加上索引值
      dateArr.push(date);
    }
    return dateArr;
  }
}
