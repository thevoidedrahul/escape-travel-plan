import { Observable } from 'rxjs';
import { HttpHandler, HttpRequest, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { Injectable } from '@angular/core';

const AccessToken: string = 'progtest';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor() { }
  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.handlerRequest(request, next);
  }

  handlerRequest(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({ setHeaders: this.setApiHeaders() });

    return next.handle(request);
  }

  private setApiHeaders() {
    let header = {
      Authorization: `Bearer ${AccessToken}`
    }

    return header;
  }
}
