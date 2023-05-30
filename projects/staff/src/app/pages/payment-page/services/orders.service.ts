import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'https://4200/api/orders'; // 根據您的實際 API 路徑進行修改

  constructor(private http: HttpClient) { }


  generateOrder(): Observable<any> {
    const order = {
      orderNumber: 'ORD123',
      products: [
        {
          id: 'P001',
          name: 'Product 1',
          price: 10
        },
        {
          id: 'P002',
          name: 'Product 2',
          price: 15
        }
      ]
    };

    // 使用 of() 建立一個 Observable，並將訂單資料作為值發送出去
    return of(order).pipe(delay(1000)); // 使用 delay() 來模擬延遲
  }

  // generateOrder(): Observable<any> {

  //   return this.http.get<any>(this.apiUrl);
  // }
}
