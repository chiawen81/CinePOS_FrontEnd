import { Injectable } from '@angular/core';
import { filter, Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
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
export class TheaterService {

  isPopupInvalidMsg = false;

  constructor(
    private http: HttpClient
  ) { }

  // 取得影廳列表
  getTheaterList(name: string, floor: number, type: string, capacityFrom: number, capacityTo: number, withDisabled: number, status: number) {
    // return data;
    const url = 'theater/list'

    return this.request(HTTP_METHOD.GET, { name: name, floor: floor, type: type, capacityFrom: capacityFrom, capacityTo: capacityTo, withDisabled: withDisabled, status: status }, url);
  }

  // 取得影廳資訊
  getTheaterInfo(id: string) {
    const url = `theater/${id}`

    return this.request(HTTP_METHOD.GET, {}, url);
  }

  // 新增影廳
  createTheater(param: {
    name: string,
    type: number,
    floor: number,
    totalCapacity: number,
    wheelChairCapacity: number,
    row: number,
    col: number,
    rowLabel: string[],
    colLabel: string[],
    seatMap: string[],
    status: number
  }) {
    const url = `theater`
    return this.request(HTTP_METHOD.POST, param, url);
  }

  // 更新電影影廳
  updateTheater(id: string, param: {
    name: string,
    type: number,
    floor: number,
    totalCapacity: number,
    wheelChairCapacity: number,
    row: number,
    col: number,
    rowLabel: string[],
    colLabel: string[],
    seatMap: string[]
  }) {
    const url = `theater/${id}`
    return this.request(HTTP_METHOD.PATCH, param, url);
  }

  // 發佈影廳
  updateStatus(id: string, param: {
    status: number
  }) {
    const url = `theater/${id}/onoffline`
    return this.request(HTTP_METHOD.PATCH, param, url);
  }

  // 刪除影廳
  deleteTheater(id: string) {
    const url = `theater/${id}`
    return this.request(HTTP_METHOD.DELETE, {}, url);
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
