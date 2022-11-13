import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtilService } from '../services/util.service';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor( private util : UtilService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    var token = this.util.getToken();
    var BearerToken = "Bearer " + token;
    const newReaquest = request.clone({
      setHeaders : {
        Authorization : BearerToken
      }
    });
    return next.handle(newReaquest);
  }
}
