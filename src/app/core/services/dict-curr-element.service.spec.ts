import { TestBed } from '@angular/core/testing';

import { DictCurrElementService } from './dict-curr-element.service';

describe('DictCurrElementService', () => {
  let service: DictCurrElementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DictCurrElementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
