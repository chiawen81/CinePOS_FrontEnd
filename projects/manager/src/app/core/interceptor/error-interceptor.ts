import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
import { StorageService } from '../services/storage/storage.service';
import { StorageEnum } from '../enums/storage/storage-enum';



@Injectable()
export class ErrorHeaderInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
          catchError((err: HttpErrorResponse) => {
            alert(err.error.message);
            return throwError(err);
          })
        )
  }
}
