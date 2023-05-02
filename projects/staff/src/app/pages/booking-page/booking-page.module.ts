import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingPageComponent } from './booking-page.component';
import { TicketTypeComponent } from './components/ticket-type/ticket-type.component';
import { SelectSeatComponent } from './components/select-seat/select-seat.component';
import { RouterModule, Routes } from '@angular/router';
import { STATIC_ROUTES } from '../../core/constant/routes.constant';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  /**訂票頁(場次查詢) */
  {
    path: '',
    component: BookingPageComponent,
  },
  /**選擇票種頁 */
  {
    path: STATIC_ROUTES.BOOKING.TICKET_TYPE,
    component: TicketTypeComponent,
  },
  /**劃位頁 */
  {
    path: STATIC_ROUTES.BOOKING.SELECT_SEAT,
    component: SelectSeatComponent,
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
    TicketTypeComponent,
    SelectSeatComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ...materialModules,
    // ...featureModules
  ]
})
export class BookingPageModule { }
