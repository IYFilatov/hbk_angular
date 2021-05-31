import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { dictElement } from 'src/app/shared/models/dict-element';
import { EndpointBuilderService } from './endpoint-builder.service';

@Injectable({
  providedIn: 'root'
})
export class DictElementService {

  constructor(private http: HttpClient, private endpointBuilder: EndpointBuilderService) { }

  getDictElement(base: string, dictName: string, elementNumber: number): Observable<any> {
    const url: string = this.endpointBuilder.createUrlWithPathVariables('dict', [base, dictName, elementNumber]);
    return this.http.get(url).pipe(
      map(data => data['element'])
    );
  }

  addNewElement(base: string, dictName: string, dictElement: dictElement): Observable<Object> {
    const url: string = this.endpointBuilder.createUrlWithPathVariables('dict', [base, dictName]);
    const reqBody = this.getNewElementBody(dictElement);

    return this.http.post(url, reqBody, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  updateElement(base: string, dictName: string, elementNumber: number, dictElement: dictElement): Observable<Object> {
    const url: string = this.endpointBuilder.createUrlWithPathVariables('dict', [base, dictName, elementNumber]);
    const reqBody = this.getNewElementBody(dictElement);

    return this.http.put(url, reqBody, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  getNewElementBody(dictElement: dictElement): Object {
    const resBody = Object.assign({}, dictElement);
    delete resBody.number;

    return resBody;
  }  

}
