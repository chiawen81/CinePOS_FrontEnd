import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, filter, throwError } from 'rxjs';

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


  /**
   * 關閉所有API
   * - 需要擺脫後端的時候，可以手動改成 true
   */
  isCloseAllApi = false;
  isPopupInvalidMsg = false;
  constructor(
    private http: HttpClient,

  ) { }

  getTimetableList() {
    // return data;
    const url = 'timetable/list'
    return this.request(HTTP_METHOD.GET, { startTime: 1689350400000, endTime: 1689436800000 }, url);
  }

  deleteTimetable(id: string) {
    const url = `timetable/${id}`
    return this.request(HTTP_METHOD.DELETE, {}, url);
  }

  updateTimetable(param: {
    _id: string,
    movieId: string,
    theaterId: string,
    startTime: number,
    endTime: number
  }) {
    const url = `timetable/update`
    return this.request(HTTP_METHOD.PATCH, param, url);
  }

  createTimetable(param: {
    movieId: string,
    theaterId: string,
    startTime: Date,
    endTime: Date
  }) {
    const url = `timetable/create`
    return this.request(HTTP_METHOD.POST, param, url);
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
    const url = 'http://127.0.0.1:3005' + '/v1/manager/' + api;

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

  duration: number;

  color: string;

  rate: RateCode

  constructor(data: MovieData) {
    this.id = data.id;
    this.text = data.text;
    this.director = data.director;
    this.year = data.year;
    this.image = data.image;
    this.duration = data.duration;
    this.color = data.color;
    this.rate = data.rate;
  }
}

export interface TheatreData {
  text: string;

  id: number;
}

export interface Data {
  theatreId: string;

  movieId: string;

  startDate: Date;

  endDate: Date;

  rate?: number;

  rateName: string;
}

// const moviesData: MovieData[] = [{
//   id: 1,
//   text: 'His Girl Friday',
//   director: 'Howard Hawks',
//   year: 1940,
//   image: 'images/movies/HisGirlFriday.jpg',
//   duration: 92,
//   color: '#cb6bb2',
// }, {
//   id: 2,
//   text: 'Royal Wedding',
//   director: 'Stanley Donen',
//   year: 1951,
//   image: 'images/movies/RoyalWedding.jpg',
//   duration: 93,
//   color: '#56ca85',
// }, {
//   id: 3,
//   text: 'A Star Is Born',
//   director: 'William A. Wellman',
//   year: 1937,
//   image: 'images/movies/AStartIsBorn.jpg',
//   duration: 111,
//   color: '#1e90ff',
// }, {
//   id: 4,
//   text: 'The Screaming Skull',
//   director: 'Alex Nicol',
//   year: 1958,
//   image: 'images/movies/ScreamingSkull.jpg',
//   duration: 68,
//   color: '#ff9747',
// }, {
//   id: 5,
//   text: "It's a Wonderful Life",
//   director: 'Frank Capra',
//   year: 1946,
//   image: 'images/movies/ItsAWonderfulLife.jpg',
//   duration: 130,
//   color: '#f05797',
// },
// {
//   id: 6,
//   text: 'City Lights',
//   director: 'Charlie Chaplin',
//   year: 1931,
//   image: 'images/movies/CityLights.jpg',
//   duration: 87,
//   color: '#2a9010',
// }
// ];

const theatreData: TheatreData[] = [{
  text: '第一廳',
  id: 0,
},
{
  text: '第二廳',
  id: 1,
},
{
  text: '第三廳',
  id: 2,
},
];

// const data: Data[] = [{
//   theatreId: 0,
//   movieId: 3,
//   startDate: new Date('2021-04-26T16:10:00.000Z'),
//   endDate: new Date('2021-04-26T18:01:00.000Z'),
//   rate: 1,
//   rateName: '普遍級'
// }, {
//   theatreId: 0,
//   movieId: 1,
//   startDate: new Date('2021-04-26T18:30:00.000Z'),
//   endDate: new Date('2021-04-26T20:02:00.000Z'),
//   rate: 2,
//   rateName: '保護級'
// }, {
//   theatreId: 0,
//   movieId: 3,
//   startDate: new Date('2021-04-26T20:30:00.000Z'),
//   endDate: new Date('2021-04-26T22:21:00.000Z'),
//   rate: 3,
//   rateName: '輔導級12+'
// }, {
//   theatreId: 1,
//   movieId: 4,
//   startDate: new Date('2021-04-26T23:00:00.000Z'),
//   endDate: new Date('2021-04-27T00:08:00.000Z'),
//   rate: 4,
//   rateName: '輔導級15+'
// }, {
//   theatreId: 1,
//   movieId: 2,
//   startDate: new Date('2021-04-27T10:30:00.000Z'),
//   endDate: new Date('2021-04-27T12:03:00.000Z'),
//   rate: 5,
//   rateName: '限制級'
// }, {
//   theatreId: 2,
//   movieId: 1,
//   startDate: new Date('2021-04-26T08:30:00.000Z'),
//   endDate: new Date('2021-04-26T10:02:00.000Z'),
//   rate: 3,
//   rateName: '輔導級12+'
// }, {
//   theatreId: 2,
//   movieId: 2,
//   startDate: new Date('2021-04-27T04:20:00.000Z'),
//   endDate: new Date('2021-04-27T05:53:00.000Z'),
//   rate: 3,
//   rateName: '輔導級12+'
// }
// ];

export enum RateCode {
  g = 0,
  pg = 6,
  pg12 = 12,
  pg15 = 15,
  r = 18
}