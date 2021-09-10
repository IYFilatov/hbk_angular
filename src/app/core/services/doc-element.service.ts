import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { EndpointBuilderService } from './endpoint-builder.service';
import { docElement } from 'src/app/shared/models/documents/doc-element';


@Injectable({
  providedIn: 'root'
})
export class DocElementService {

  constructor(private http: HttpClient, private endpointBuilder: EndpointBuilderService) { }

  getDocElement(base: string, docName: string, elementNumber: number): Observable<any> {
    const url: string = this.endpointBuilder.createUrlWithPathVariables('doc', [base, docName, elementNumber]);
    return this.http.get(url).pipe(
      map(data => data['element'])
    );
  }

  addNewElement(base: string, docName: string, docElement: docElement): Observable<Object> {
    const url: string = this.endpointBuilder.createUrlWithPathVariables('doc', [base, docName]);
    const reqBody = this.getNewElementBody(docElement);

    return this.http.post(url, reqBody, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  updateElement(base: string, docName: string, elementNumber: number, docElement: docElement): Observable<Object> {
    const url: string = this.endpointBuilder.createUrlWithPathVariables('doc', [base, docName, elementNumber]);
    const reqBody = this.getNewElementBody(docElement);
    
    return this.http.put(url, reqBody, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  getNewElementBody(docElement: docElement): Object {
    let resBody = Object.assign({}, docElement);
    resBody = this.adaptTypes(resBody);    
    delete resBody.number;
    
    return resBody;
  }  

  adaptTypes(obj:docElement ): docElement{
    const dateFields = Object.keys(obj).filter((key) => Object.prototype.toString.call(obj[key]) === '[object Date]');
    dateFields.forEach((v)=>{
      //obj[v] = obj[v].toISOString().slice(0, 19).replace('T', ' ');
      obj[v] = obj[v].toLocaleString('en-GB').replace(/(\w+)\/(\w+)\/(\w+), (\w+)/, '$3-$2-$1 $4')
    })
      
    return obj;
  }
  
}
