import { Injectable } from '@angular/core';
import { QueryStringParameters } from 'src/app/shared/classes/query-string-parameters';
import { UrlBuilder } from 'src/app/shared/classes/url-builder';
import { Constants } from '../configs/constants';

@Injectable({
  providedIn: 'root'
})
export class EndpointBuilderService {

  constructor(private constants: Constants) { }

  public createUrl(action: string): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(this.constants.API_ENDPOINT, action);
    return urlBuilder.toString();
  }
  
  public createUrlWithQueryParameters(action: string, queryStringHandler?: (queryStringParameters: QueryStringParameters) => void): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(this.constants.API_ENDPOINT, action);

    if (queryStringHandler) {
      queryStringHandler(urlBuilder.queryString);
    }
    
    return urlBuilder.toString();
  }
  
  public createUrlWithPathVariables(action: string, pathVariables: any[] = []): string {
    let encodedPathVariablesUrl: string = '';
    
    for (const pathVariable of pathVariables) {
      if (pathVariable !== null) {
        encodedPathVariablesUrl += `/${encodeURIComponent(pathVariable.toString())}`;
      }
    }

    const urlBuilder: UrlBuilder = new UrlBuilder(this.constants.API_ENDPOINT,  `${action}${encodedPathVariablesUrl}`);
    
    return urlBuilder.toString();
  }
  
}
