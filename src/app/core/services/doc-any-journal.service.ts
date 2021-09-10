import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { docJournal } from 'src/app/shared/models/documents/doc-journal';
import { EndpointBuilderService } from './endpoint-builder.service';

@Injectable({
  providedIn: 'root'
})
export class DocAnyJournalService {

  constructor(private http: HttpClient, private endpointBuilder: EndpointBuilderService) { }

  getDocJournal(base: string, docName: string): Observable<docJournal> {
    const url: string = this.endpointBuilder.createUrlWithPathVariables('doc', [base, docName]);
    return this.http.get(url).pipe(
      map(
        data => { return{"type": "doc", "name": docName, "data": data['journal']} }
      )
    );
  }

  searchJournal(base: string, docName: string, searchText: string = ''): Observable<docJournal> {
    let queryParam = new Map([
      ['st', searchText]
    ]);    

    const url: string = this.endpointBuilder.createUrlWithPathVarAndQueryMap('doc', [base, docName], queryParam);
    return this.http.get(url).pipe(
      map(
        data => { return{"type": "doc", "name": docName, "data": data['journal']} }
      )
    );
  }

  deleteElement(base: string, docName: string, elementNumber: number){
    const url: string = this.endpointBuilder.createUrlWithPathVariables('doc', [base, docName, elementNumber]);
    
    return this.http.delete(url);
  }

  markAsDeleted(base: string, docName: string, elementNumber: number){
    const url: string = this.endpointBuilder.createUrlWithPathVariables('doc', [base, docName, elementNumber]);
    
    return this.http.put(url, {delmark: true}, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });    
  }
}
