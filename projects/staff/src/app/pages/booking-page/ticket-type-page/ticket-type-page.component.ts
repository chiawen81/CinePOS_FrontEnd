import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { STATIC_ROUTES } from '../../../core/constant/routes.constant';

@Component({
  selector: 'app-ticket-type-page',
  templateUrl: './ticket-type-page.component.html',
  styleUrls: ['./ticket-type-page.component.scss']
})
export class TicketTypePageComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  goSelectSeat(): void{
    // 將選取的票種&票數存進services
    this.router.navigate(
      [`/${STATIC_ROUTES.BOOKING.ROOT}/${STATIC_ROUTES.BOOKING.SELECT_SEAT}`]
    );
  }
}
