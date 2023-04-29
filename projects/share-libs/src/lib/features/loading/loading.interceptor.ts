import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingService } from './loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  private requests: HttpRequest<any>[] = [];
  private whiteList: string[] = [];

  constructor(private loadingService: LoadingService) { }

  isInWhiteList(url: string): boolean {
    let result = false;

    if (url) {
      for (const whiteUrl of this.whiteList) {
        if (url.includes(whiteUrl)) {
          result = true;
          break;
        }
      }
    }

    return result;
  }

  removeRequest(req: HttpRequest<any>): void {
    if (!this.isInWhiteList(req.url)) {
      const i = this.requests.indexOf(req);
      if (i >= 0) {
        this.requests.splice(i, 1);
      }

      if (this.requests.length === 0) {
        this.loadingService.loading(false);
      }
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isInWhiteList(req.url)) {
      if (this.requests.length === 0) {
        this.loadingService.loading(true);
      }
      this.requests.push(req);
    }

    return new Observable(observer => {
      const subscription = next.handle(req)
        .subscribe(
          event => {
            if (event instanceof HttpResponse) {
              this.removeRequest(req);
              observer.next(event);
            }
          },
          err => { this.removeRequest(req); observer.error(err); },
          () => { this.removeRequest(req); observer.complete(); });

      // teardown logic in case of cancelled requests
      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }
}
