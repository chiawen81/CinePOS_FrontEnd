import { Injectable } from '@angular/core';
import { ScheduleListRes, StaffService } from 'projects/staff/src/app/api/cinePOS-api';
import { Observable, filter, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(
    private staffService:StaffService
  ) { }
  v1StaffScheduleListGet$(reqData: { startDate: string, endDate: string }): Observable<ScheduleListRes> {
    return this.staffService.v1StaffScheduleListGet(reqData.startDate,reqData.endDate)
    .pipe(
      tap(res => res.code !== 1 && alert(res.message)),
      filter(res => res.code === 1)
    )
  }
}
