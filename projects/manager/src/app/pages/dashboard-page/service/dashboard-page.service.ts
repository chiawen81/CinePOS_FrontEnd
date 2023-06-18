import { Injectable } from '@angular/core';
import { Observable, filter, tap } from 'rxjs';
import { ManagerService } from '../../../api/cinePOS-api/api/manager.service';
import { DashboardMetricSuccess } from '../../../api/cinePOS-api/model/dashboardMetricSuccess';
import { DashboardBoxOfficeChartSuccess } from '../../../api/cinePOS-api/model/dashboardBoxOfficeChartSuccess';

@Injectable({
  providedIn: 'root'
})

export class DashboardPageService {

  constructor(
    private _ManagerService: ManagerService
  ) { }

  // 取得當日營收
  getMetric(searchDate: string): Observable<DashboardMetricSuccess> {
    return this._ManagerService.v1ManagerDashboardMetricGet(searchDate)
      .pipe(
        tap(res => res.code !== 1 && alert(res.message)),
        filter(res => res.code === 1)
      )
  }


  // 取得票房圖表資料
  getBoxOfficeChartData(searchDate: string): Observable<DashboardBoxOfficeChartSuccess> {
    return this._ManagerService.v1ManagerDashboardBoxOfficeGet(searchDate)
      .pipe(
        tap(res => res.code !== 1 && alert(res.message)),
        filter(res => res.code === 1)
      )
  }



}
