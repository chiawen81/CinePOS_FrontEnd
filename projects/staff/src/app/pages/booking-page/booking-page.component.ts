import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { STATIC_ROUTES } from '../../core/constant/routes.constant';
import { ManagementService } from '../../features/booking/services/management.service';
import { BookingService } from './services/booking/booking.service';
import { ScheduleListResData } from '../../api/cinePOS-api';
@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.scss']
})
export class BookingPageComponent implements OnInit {

  constructor(
    private router: Router,
    private bookingComponentsService:ManagementService,
    private bookingService:BookingService
  ) { }

  dateCount = 7;
  dateArr: Date[] = [];

  data:ScheduleListResData[] = [];


  ngOnInit(): void {
    this.dateArr = this.createDates(this.dateCount);
    this.getScheduleList(String(this.dateArr[0].getTime()));
  }
  goTicketType(): void {
    // 將選取的票種&票數存進services
    this.router.navigate(
      [`/${STATIC_ROUTES.BOOKING.ROOT}/${STATIC_ROUTES.BOOKING.TICKET_TYPE}`]
    );
  }

  getScheduleList($event: string): void {
    this.bookingComponentsService.dateSelect$.next($event);
    const startTime = $event;
    const endDate = new Date(Number(startTime));
    console.log(endDate.toISOString());
    endDate.setHours(23, 59, 59, 999);
    console.log(endDate.toISOString());
    const endTime = String(endDate.getTime());
    this.data = [];
    this.bookingService.v1StaffScheduleListGet$({startDate: startTime,endDate:endTime})
    .subscribe((res)=>{
      res.data.forEach(currentItem => {
        this.data.push(currentItem);
      });
    })
  }

  // 生成日期
  createDates(num: number): Date[] {
    const dateArr:Date[] = [];
    const today = new Date(); // 當前日期和時間
    for (var i = 0; i < num; i++) {
      var date = new Date(today); // 複製當前日期
      date.setDate(today.getDate() + i); // 設定日期為當前日期加上索引值
      date.setHours(0,0,0,0);
      dateArr.push(date);
    }
    return dateArr;
  }

  opneSeatPOP($event:string): void{
    console.log('opneSeatPOP',$event);
  }
}
