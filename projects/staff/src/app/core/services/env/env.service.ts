import { isPlatformServer } from "@angular/common";
import { HttpClient, HttpBackend } from "@angular/common/http";
import { Inject, Injectable, Optional, PLATFORM_ID } from "@angular/core";
import { REQUEST } from "@nguniversal/express-engine/tokens";
import { Request } from 'express';
import { environment } from "projects/staff/src/environments/environment";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class EnvService {

    private httpClient: HttpClient = new HttpClient(this._handler);
    private configuration: any;

    constructor(
        @Optional() @Inject(REQUEST) protected request: Request,
        @Inject(PLATFORM_ID) private platformId: Object,
        private _handler: HttpBackend,
    ) { }


    loadEnvironment(): Observable<any> {
        const protocolHost = isPlatformServer(this.platformId)
            ? `${this.request.protocol}://${this.request.get('host')}`
            : '';

        return this.httpClient.get(protocolHost + environment.cinePosApi)
            .pipe(
                map(res => {
                    this.configuration = res;
                    return res;
                }),
                catchError(err => {
                    return throwError(err);
                })
            );
    }

    get environmentConfig() {
        return this.configuration;
    }
}
