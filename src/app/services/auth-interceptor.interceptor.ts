import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable, pipe } from 'rxjs';
import { UtilService } from '../services/util.service';
import { LoaderService } from './loader.service';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor( private util : UtilService, private loader: LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loader.show();
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
