import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class Constants {
    //endpoints
    public readonly API_SERVER: string = 'http://localhost:8080/api';
    public readonly API_MOCK_ENDPOINT: string = 'mock-api';
    public readonly API_FAKE_SERVER: string = 'http://localhost:3000/api';

    public readonly API_ENDPOINT: string = this.API_SERVER;

    //auth
    public readonly TOKEN_HEADER_KEY = 'x-access-token';

    //default values
    public readonly DEFAULT_BASE_NAME = 'DEF';
}