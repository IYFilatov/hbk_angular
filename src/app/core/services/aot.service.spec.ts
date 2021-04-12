import { TestBed } from '@angular/core/testing';

import { AotService } from './aot.service';

describe('AotService', () => {
  let service: AotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
