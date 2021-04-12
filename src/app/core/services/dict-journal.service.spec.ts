import { TestBed } from '@angular/core/testing';

import { DictJournalService } from './dict-journal.service';

describe('DictJournalService', () => {
  let service: DictJournalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DictJournalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
