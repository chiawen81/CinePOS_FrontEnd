import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, of } from 'rxjs';
import { StaffOrderCreateReq, StaffOrderCreateSuccess, StaffService } from '../../../api/cinePOS-api';
import { StorageService } from '../../../core/services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'https://4200/api/orders'; // 根據您的實際 API 路徑進行修改

  constructor(
    private http: HttpClient,
    private staffService: StaffService,
    private storageService: StorageService
  ) { }

  /** 送出訂單 */
  v1StaffSeatCheckLockPost$(): Observable<StaffOrderCreateSuccess> {
    const staffOrderCreateReq: StaffOrderCreateReq = {
      "ticketList" : [
          {
              "ticketId" : "6471e9fcbe714b8e2a3dd231",
              "price" : 280,
              "ticketTypeId":"6460a7626b1ed843a113b9b6",
              "movieId":"6458680f68d71390eb9fe56b",
               "scheduleId":"645cf11f2e05063973b5f9ed",
               "seatName":"F12"
          }
      ],
      "paymentMethod" : 1,
      "amount" : 280
    }
    return this.staffService.v1StaffOrderPost(staffOrderCreateReq)
    // 外層控制 res.code !== 1
  }


  generateOrder(item: StaffOrderCreateReq): Observable<StaffOrderCreateSuccess> {
    console.log(item);

    return this.staffService.v1StaffOrderPost(item);
  }


}
