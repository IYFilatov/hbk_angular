import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { EndpointBuilderService } from './endpoint-builder.service';
import { aotElement } from 'src/app/shared/models/aot-element';

@Injectable({
  providedIn: 'root'
})
export class AotService {

  constructor(private http: HttpClient, private endpointBuilder: EndpointBuilderService) { }

  getDictList(base: string): Observable<aotElement[]> {
    const url: string = this.endpointBuilder.createUrlWithPathVariables('dict', [base]);
    return this.http.get(url).pipe(
      map(
        data => data['dictionaries']?.map(v => ({"type": "dict", "name": v}))
      )
    );
  }
}
