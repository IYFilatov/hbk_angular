import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { dictJournal } from 'src/app/shared/models/dict-journal';
import { EndpointBuilderService } from './endpoint-builder.service';

@Injectable({
  providedIn: 'root'
})
export class DictJournalService {

  constructor(private http: HttpClient, private endpointBuilder: EndpointBuilderService) { }

  getDictJournal(base: string, dictName: string): Observable<dictJournal> {
    const url: string = this.endpointBuilder.createUrlWithPathVariables('dict', [base, dictName]);
    return this.http.get(url).pipe(
      map(
        data => { return{"type": "dict", "name": dictName, "data": data['journal']} }
      )
    );
  }
}
