import { ManagerService } from './../../../api/cinePOS-api/api/manager.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable, Subject, catchError, filter, throwError } from 'rxjs';
import { TimetableCreateReq, TimetableUpdateReq } from '../../../api/cinePOS-api';
import { environment } from 'projects/manager/src/environments/environment';

/** Request Method */
export const enum HTTP_METHOD {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete'
}

/**
 * Server 回傳的代號列舉
 */
export enum ResponseCode {
  /**
   * 成功
   */
  success = 1,

  /**
   * 系統錯誤，服務異常
   */
  systemError = -1,
}

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  dateSelect$ = new Subject<number>(); // 日期選擇控制
  onDestroy$ = new Subject<void>(); // 結束後結束訂閱控制
  /**
   * 關閉所有API
   * - 需要擺脫後端的時候，可以手動改成 true
   */
  isCloseAllApi = false;
  isPopupInvalidMsg = false;
  constructor(
    private http: HttpClient,
    private managerService: ManagerService
  ) { }

  /**
   * 取得時刻表
   */
  getTimetableList(startDate: number, endDate: number) {
    // const url = 'timetable/list'

    // return this.request(HTTP_METHOD.GET, { startDate: startDate, endDate: endDate }, url);
    // return this.managerService.v1ManagerTimetableListGet(startDate, endDate);
    return this.managerService.v1ManagerTimetableListGet(0, 0);
  }

  /**
   * 刪除時刻表
   * @param id 時刻表id
   * @returns
   */
  deleteTimetable(id: string) {
    // const url = `timetable/${id}`
    // return this.request(HTTP_METHOD.DELETE, {}, url);
    return this.managerService.deleteItem(id);
  }

  /**
   * 更新時刻表
   * @param param
   * @returns
   */
  updateTimetable(param: TimetableUpdateReq) {
    // const url = `timetable/update`
    // return this.request(HTTP_METHOD.PATCH, param, url);
    return this.managerService.updateTimetable(param);
  }

  /**
   * 新增時刻表
   * @param param
   * @returns
   */
  createTimetable(param: TimetableCreateReq) {
    // const url = `timetable/create`
    // return this.request(HTTP_METHOD.POST, param, url);
    // const url = `timetable/create`
    return this.managerService.createTimetable(param);
  }

  /**
   * TODO: 先醜醜的寫
   * 1:已發布
   * @returns
   */
  getTheaterList() {
    const url = `theater/list`
    return this.request(HTTP_METHOD.GET, { status: 1 }, url);
  }

  /**
 * call HTTP 主要方法
 * @param method http method
 * @param requestParams request body
 * @param api api url
 */
  private request(method: string, requestParams: any, api: string): Observable<{ code: ResponseCode, data: any, message?: string }> {
    // if (this.isCloseAllApi) {
    //   return this.closeAllAPI() as unknown as Observable<MercueResponse>;
    // } else {
    const httpHeaders = this.getHTTPHeaders();
    const url = environment.cinePosApi + '/v1/manager/' + api;
    // const url = 'https://api-t.cine-pos.com' + '/v1/manager/' + api;

    switch (method) {
      case HTTP_METHOD.GET:
        return this.http
          .get<any>(url, { headers: httpHeaders, params: requestParams })
          .pipe(filter(this.handleResponse), catchError(this.handleError));
      case HTTP_METHOD.DELETE:
        return this.http
          .delete<any>(url, { headers: httpHeaders, params: requestParams })
          .pipe(filter(this.handleResponse), catchError(this.handleError));
      case HTTP_METHOD.POST:
        return this.http
          .post<any>(url, requestParams, { headers: httpHeaders })
          .pipe(filter(this.handleResponse), catchError(this.handleError));
      case HTTP_METHOD.PATCH:
        return this.http
          .patch<any>(url, requestParams, { headers: httpHeaders })
          .pipe(filter(this.handleResponse), catchError(this.handleError));
      case HTTP_METHOD.PUT:
        return this.http
          .put<any>(url, requestParams, { headers: httpHeaders })
          .pipe(filter(this.handleResponse), catchError(this.handleError));
      default:
        return this.http
          .get<any>(url, { headers: httpHeaders, params: requestParams })
          .pipe(filter(this.handleResponse), catchError(this.handleError));
    }

    // }
  }

  private getHTTPHeaders(): HttpHeaders {
    const result = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // Authorization: 'Bearer ' + sessionStorage.getItem(COMMON.TOKEN),
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    });
    return result;
  }

  /**
 * for Status Code 200的情況 (response error) && backend throw exception
 * SystemCode 值 "-1" 意思是 Api執行Method發生異常 (backend throw exception)
 * SystemCode 值 "1" 意思是 呼叫Api成功
 * @param response : MercueResponse
 */
  private handleResponse = (response: { code: ResponseCode, data: any, message?: string }): boolean => {
    let hasResult = true;
    if (response.code !== ResponseCode.success) {
      hasResult = false;
      if (!this.isPopupInvalidMsg && response.message) {
        this.isPopupInvalidMsg = true;
        alert(response.message);
        setTimeout(() => {
          this.isPopupInvalidMsg = false;
        });
      }
    }
    return hasResult;
  }

  /**
 * for Status Code 200以外 (http error)
 * @param error
 */
  private handleError = (error: HttpErrorResponse) => {
    console.log('handleError');

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    if (!this.isPopupInvalidMsg) {
      this.isPopupInvalidMsg = true;
      alert('系統發生問題');
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}

export interface Assignee {
  text: string;

  id: number;

  color: string;
}



export class MovieData {
  id: string;

  text: string;

  director?: string;

  year?: number;

  image?: string;

  runtime: number;

  color: string;

  rate: RateCode;

  rateName?: string;

  /** 提供的類型 ex:2D、3D */
  provideVersionName?: string[]

  constructor(data: MovieData) {
    this.id = data.id;
    this.text = data.text;
    this.director = data.director;
    this.year = data.year;
    this.image = data.image;
    this.runtime = data.runtime;
    this.color = data.color;
    this.rate = data.rate;
    this.rateName = data.rateName;
    this.provideVersionName = this.provideVersionName;
  }
}

export interface TheatreData {
  text: string;

  id: number;
}

export interface Data {
  theaterId: string;

  movieId: string;

  startDate: Date;

  endDate: Date;

  rate?: number;

  rateName: string;
}

export enum RateCode {
  g = 0,
  pg = 6,
  pg12 = 12,
  pg15 = 15,
  r = 18
}
