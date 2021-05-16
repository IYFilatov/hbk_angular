import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { apiDict, apiDictBanks, apiDictCurrencies, apiDictCurrId, apiSigninAdmin, apiSignupFailed } from '../mocks';

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
          case url.endsWith('mock-api/dict/DEF/currencies/1') && method === 'GET':
            return ok(apiDictCurrId);
          case url.endsWith('mock-api/auth/signin') && method === 'POST':
            return ok(apiSigninAdmin);
          case url.endsWith('mock-api/auth/signup') && method === 'POST':
            return ok(apiSignupFailed);
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
