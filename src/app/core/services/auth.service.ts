import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { EndpointBuilderService } from './endpoint-builder.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private endpointBuilder: EndpointBuilderService) { }

  login(username: string, password: string): Observable<any> {
    const url: string = this.endpointBuilder.createUrl('auth/signin');

    return this.http.post(url, {
      username,
      password
    }, httpOptions);
  }

  register(username: string, email: string, password: string): Observable<any> {
    const url: string = this.endpointBuilder.createUrl('auth/signup');

    return this.http.post(url, {
      username,
      email,
      password
    }, httpOptions);
  }  

}