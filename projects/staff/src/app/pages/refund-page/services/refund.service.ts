import { Injectable } from '@angular/core';
import { StaffOrderSearchSuccess, StaffService } from '../../../api/cinePOS-api';
import { Observable, filter, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefundService {

  constructor(
    private staffService:StaffService
  ) { }

  /**取得訂單下電影票 */
  v1StaffRefundOrderIdGet$(orderId: string): Observable<StaffOrderSearchSuccess> {
    return this.staffService.v1StaffOrderOrderIdGet(orderId)
      .pipe(
        tap(res => res.code !== 1 && alert(res.message)),
        filter(res => res.code === 1)
      )
  }
}
