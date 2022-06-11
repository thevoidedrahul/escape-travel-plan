import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })

export class HttpService {
    private apiUrl = environment.apiUrl; // setting the base url for api call

    constructor(private http: HttpClient) { }

    public get(url: string, params?: any, headers: any = { 'Content-Type': 'application/json' }, responseType: any = 'json', observeType: any = 'body'): Observable<any> {

        let httpParams = new HttpParams();
        if (params) {
            Object.keys(params).forEach((key) => {
                httpParams = httpParams.set(key, params[key]);
            });
        }

        return this.http
            .get(this.apiUrl + url, {
                params: httpParams, // if params are null then passing an empty object
                headers: headers,
                responseType: responseType,
                observe: observeType
            })
            .pipe(
                map((response: any) => {
                    return response;
                }),
                catchError((error: any) => {
                    return throwError(error);
                })
            );
    }

    //   public post(url: string, body: any, headers: any = { 'Content-Type': 'application/json' }, responseType: any = 'json', observeType: any = 'body', baseUrl: string = this.apiUrl): Observable<any> {
    //     return this.http
    //       .post(baseUrl + url, body, {
    //         headers: headers,
    //         responseType: responseType,
    //         observe: observeType
    //       })
    //       .pipe(
    //         map((response: any) => {
    //           return response;
    //         }),
    //         catchError((error: any) => {
    //           return throwError(error);
    //         })
    //       );
    //   }

    //   public put(url: string, body: any, headers: any = { 'Content-Type': 'application/json' }, responseType: any = 'json', observeType: any = 'body', baseUrl: string = this.apiUrl): Observable<any> {
    //     return this.http
    //       .put(baseUrl + url, body, {
    //         headers: headers,
    //         responseType: responseType,
    //         observe: observeType
    //       })
    //       .pipe(
    //         map((response: any) => {
    //           return response;
    //         }),
    //         catchError((error: any) => {
    //           return throwError(error);
    //         })
    //       );
    //   }

    //   public delete(url: string, params?: any, headers: any = { 'Content-Type': 'application/json' }, responseType: any = 'json', observeType: any = 'body', baseUrl: string = this.apiUrl): Observable<any> {
    //     let hasParams = false;
    //     let httpParams = new HttpParams();
    //     if (params) {
    //       Object.keys(params).forEach(function (key) {
    //         httpParams = httpParams.set(key, params[key]);
    //         hasParams = true;
    //       });
    //     }
    //     return this.http
    //       .delete(baseUrl + url, {
    //         params: hasParams ? httpParams : null,
    //         headers: headers,
    //         responseType: responseType,
    //         observe: observeType
    //       })
    //       .pipe(
    //         map((response: any) => {
    //           return response;
    //         }),
    //         catchError((error: any) => {
    //           return throwError(error);
    //         })
    //       );
    //   }
}
