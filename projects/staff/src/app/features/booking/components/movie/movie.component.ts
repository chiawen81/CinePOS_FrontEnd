import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ScheduleListResData } from 'projects/staff/src/app/api/cinePOS-api';
import { ShopCartInterface } from 'projects/staff/src/app/core/interface/shop-cart.interface';
import { BookingService } from 'projects/staff/src/app/pages/booking-page/services/booking.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  @Input() movieData: ScheduleListResData = {
    movieId: '',
    title: '',
    posterUrl: '',
    rate: 0,
    runtime: 0,
    scheduleList: []
  };
  @Output() clickMovieEmit = new EventEmitter<string>();
  constructor(
    private bookingService: BookingService
  ) { }

  ngOnInit(): void {
  }
  scheduleIdOutput($event: string): void {
    const tempData = [
      { scheduleId: $event },
      { movieId: this.movieData.movieId },
      { title: this.movieData.title }
    ];
    tempData.forEach(item => {
      const key = Object.keys(item)[0] as keyof ShopCartInterface
      this.bookingService.setShopCart(key, Object.values(item)[0]);
    });
    this.clickMovieEmit.emit($event);
  }
}
