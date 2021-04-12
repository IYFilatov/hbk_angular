import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { apiDict, apiDictBanks, apiDictCurrencies } from '../mocks';

@Injectable()
export class MockBackendInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    return of(null)
    .pipe(mergeMap(handleRoute))
    .pipe(materialize())
    .pipe(delay(500))
    .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
          case url.endsWith('mock-api/dict/DEF') && method === 'GET':
              return dictList();
          case url.endsWith('mock-api/dict/DEF/banks') && method === 'GET':
            return ok(apiDictBanks);
          case url.endsWith('mock-api/dict/DEF/currencies') && method === 'GET':
            return ok(apiDictCurrencies);
          default:
              //return error("unknown api route");
              return next.handle(request);
      }
    }

    function dictList() {
      return ok(apiDict);
      //return ok({"value": "unexpected json"});
    }
    
    //response wrappers
    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }))
    }

    function error(message) {
        return throwError({ error: { message } });
    }
    
  }
}
