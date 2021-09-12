import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpResponse,
  HttpRequest,
  HttpHandler
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class MovieInterceptor implements HttpInterceptor {
  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (httpRequest.url.includes('configuration')) {
      return next.handle(
        httpRequest.clone({
          params: httpRequest.params
            .set('api_key', environment.apiKey)
        })
      );
    }
    return next.handle(
      httpRequest.clone({
        params: httpRequest.params
          .set('api_key', environment.apiKey)
          .set('language', environment.language)
      })
    );
  }
}
