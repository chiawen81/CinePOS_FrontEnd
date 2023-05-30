/**
 * CinePOS_BackEnd
 * CinePOS 後端API
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *//* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { CommonOptionSuccess } from '../model/commonOptionSuccess';
import { CommonResFailed } from '../model/commonResFailed';
import { CommonUploadSuccess } from '../model/commonUploadSuccess';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class CommonService {

    protected basePath = 'http://localhost:3005/';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * 取得選項資料
     * 
     * @param typeId 欄位代碼(1:劇情,2:支援設備,3:分級,4:上映狀態)
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public v1CommonOptionTypeIdGet(typeId: number, observe?: 'body', reportProgress?: boolean): Observable<CommonOptionSuccess>;
    public v1CommonOptionTypeIdGet(typeId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<CommonOptionSuccess>>;
    public v1CommonOptionTypeIdGet(typeId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<CommonOptionSuccess>>;
    public v1CommonOptionTypeIdGet(typeId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (typeId === null || typeId === undefined) {
            throw new Error('Required parameter typeId was null or undefined when calling v1CommonOptionTypeIdGet.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<CommonOptionSuccess>('get',`${this.basePath}/v1/common/option/${encodeURIComponent(String(typeId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 上傳檔案
     * 
     * @param upload 
     * @param fileType 上傳類型(image:圖檔,other:其它檔案)
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public v1CommonUploadPostForm(upload: Blob, fileType: string, observe?: 'body', reportProgress?: boolean): Observable<CommonUploadSuccess>;
    public v1CommonUploadPostForm(upload: Blob, fileType: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<CommonUploadSuccess>>;
    public v1CommonUploadPostForm(upload: Blob, fileType: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<CommonUploadSuccess>>;
    public v1CommonUploadPostForm(upload: Blob, fileType: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (upload === null || upload === undefined) {
            throw new Error('Required parameter upload was null or undefined when calling v1CommonUploadPost.');
        }

        if (fileType === null || fileType === undefined) {
            throw new Error('Required parameter fileType was null or undefined when calling v1CommonUploadPost.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (fileType !== undefined && fileType !== null) {
            queryParameters = queryParameters.set('fileType', <any>fileType);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'multipart/form-data'
        ];

        const canConsumeForm = this.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): void; };
        let useForm = false;
        let convertFormParamsToString = false;
        // use FormData to transmit files using content-type "multipart/form-data"
        // see https://stackoverflow.com/questions/4007969/application-x-www-form-urlencoded-or-multipart-form-data
        useForm = canConsumeForm;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        }

        if (upload !== undefined) {
            formParams = formParams.append('upload', <any>upload) as any || formParams;
        }

        return this.httpClient.request<CommonUploadSuccess>('post',`${this.basePath}/v1/common/upload`,
            {
                body: convertFormParamsToString ? formParams.toString() : formParams,
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
