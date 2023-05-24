import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingPageComponent } from './booking-page.component';
import { RouterModule, Routes } from '@angular/router';
import { STATIC_ROUTES } from '../../core/constant/routes.constant';
import { MatButtonModule } from '@angular/material/button';
import { SelectSeatPageComponent } from './select-seat-page/select-seat-page.component';
import { TicketTypePageComponent } from './ticket-type-page/ticket-type-page.component';
import { DateSelectComponent } from './components/date-select/date-select.component';

const routes: Routes = [
  /**訂票頁(場次查詢) */
  {
    path: '',
    component: BookingPageComponent,
  },
  /**選擇票種頁 */
  {
    path: STATIC_ROUTES.BOOKING.TICKET_TYPE,
    component: TicketTypePageComponent,
  },
  /**劃位頁 */
  {
    path: STATIC_ROUTES.BOOKING.SELECT_SEAT,
    component: SelectSeatPageComponent,
  },
]

const materialModules = [
  MatButtonModule
];

const featureModules = [

];

@NgModule({
  declarations: [
    BookingPageComponent,
    SelectSeatPageComponent,
    TicketTypePageComponent,
    DateSelectComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ...materialModules,
    // ...featureModules
  ]
})
export class BookingPageModule { }
