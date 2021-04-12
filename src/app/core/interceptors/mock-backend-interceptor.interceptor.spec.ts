import { TestBed } from '@angular/core/testing';

import { MockBackendInterceptorInterceptor } from './mock-backend-interceptor.interceptor';

describe('MockBackendInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      MockBackendInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: MockBackendInterceptorInterceptor = TestBed.inject(MockBackendInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
