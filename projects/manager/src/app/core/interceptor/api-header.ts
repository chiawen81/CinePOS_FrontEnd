import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { StorageService } from '../services/storage/storage.service';
import { StorageEnum } from '../enums/storage/storage-enum';



@Injectable()
export class ApiHeaderInterceptor implements HttpInterceptor {

  constructor(
    private storageService: StorageService
  ) { }

  apiUrlToCheck = [
    'login/\\w+',
  ].map(x => new RegExp(x));

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const checkNetwork = this.apiUrlToCheck.some(x => x.test(req.url))
    if (!checkNetwork) {
      req = req.clone({
        setHeaders: {
          'Authorization': 'Bearer ' + this.storageService.getLocalStorage(StorageEnum.token)
        },
      });
    }

    return next.handle(req);
  }
}
