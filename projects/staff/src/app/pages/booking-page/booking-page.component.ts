import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { STATIC_ROUTES } from '../../core/constant/routes.constant';
import { ManagementService } from '../../features/booking/services/management.service';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.scss']
})
export class BookingPageComponent implements OnInit {

  constructor(
    private router: Router,
    private bookingComponentsService:ManagementService
  ) { }

  dateCount = 7;
  dateArr: Date[] = [];

  data = [
    {
        "movieId": "645869f668d71390eba143d3",
        "title": "小美人魚",
        "posterUrl": "https://firebasestorage.googleapis.com/v0/b/test0421-f01d7.appspot.com/o/%E5%B0%8F%E7%BE%8E%E4%BA%BA%E9%AD%9A.jpg?alt=media&token=a6f26e05-6636-4af8-8955-548ed705de84",
        "runtime": 100,
        "rate": 0,
        "scheduleList": [
            {
                "scheduleId": "646a0b4591a4e35d3806be52",
                "theater": "第5廳",
                "theaterType": "1",
                "totalCapacity": 200,
                "remainSeats": 200
            },
            {
                "scheduleId": "646a0b9391a4e35d3806be58",
                "theater": "第7廳",
                "theaterType": "1",
                "totalCapacity": 200,
                "remainSeats": 200
            }
        ]
    },
    {
        "movieId": "645869ce68d71390eba12734",
        "title": "上流謀殺案",
        "posterUrl": "https://firebasestorage.googleapis.com/v0/b/test0421-f01d7.appspot.com/o/%E4%B8%8A%E6%B5%81%E8%AC%80%E6%AE%BA%E6%A1%88.jpg?alt=media&token=53ad7996-ff0d-4eee-b120-0c641f00e3b8",
        "runtime": 92,
        "rate": 6,
        "scheduleList": [
            {
                "scheduleId": "646a0b6e91a4e35d3806be55",
                "theater": "第7廳",
                "theaterType": "1",
                "totalCapacity": 200,
                "remainSeats": 200
            }
        ]
    }
]

  ngOnInit(): void {

    this.dateArr = this.createDates(this.dateCount);

  }
  goTicketType(): void {
    // 將選取的票種&票數存進services
    this.router.navigate(
      [`/${STATIC_ROUTES.BOOKING.ROOT}/${STATIC_ROUTES.BOOKING.TICKET_TYPE}`]
    );
  }

  getScheduleList($event: string): void {
    this.bookingComponentsService.dateSelect$.next($event);
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
