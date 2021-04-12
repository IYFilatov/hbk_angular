import { TestBed } from '@angular/core/testing';

import { EndpointBuilderService } from './endpoint-builder.service';

describe('EndpointBuilderService', () => {
  let service: EndpointBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EndpointBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
