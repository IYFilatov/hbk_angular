import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { dictCurrElement } from 'src/app/shared/models/dict-curr-element';
import { EndpointBuilderService } from './endpoint-builder.service';

@Injectable({
  providedIn: 'root'
})
export class DictCurrElementService {

  dictCurrElement: dictCurrElement;

  constructor(private http: HttpClient, private endpointBuilder: EndpointBuilderService) { }

  getCurrElement(base: string, dictName: string, elementNumber: number): Observable<dictCurrElement> {
    const url: string = this.endpointBuilder.createUrlWithPathVariables('dict', [base, dictName, elementNumber]);
    return this.http.get(url).pipe(
      map(data => data['element'])
    );
  }

  addNewElement(base: string, dictName: string, currElement: dictCurrElement): Observable<Object> {
    const url: string = this.endpointBuilder.createUrlWithPathVariables('dict', [base, dictName]);
    const reqBody = this.getNewElementBody(currElement);

    return this.http.post(url, reqBody, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  getNewElementBody(currElement: dictCurrElement): Object {
    const resBody = Object.assign({}, currElement);
    delete resBody.number;

    return resBody;
  }

}
