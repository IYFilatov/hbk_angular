import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class Constants {
    public readonly API_SERVER: string = 'http://localhost:8080/api';
    public readonly API_MOCK_ENDPOINT: string = 'mock-api';

    public readonly API_ENDPOINT: string = this.API_MOCK_ENDPOINT;
}