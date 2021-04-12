import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictJournalComponent } from './dict-journal.component';

describe('DictJournalComponent', () => {
  let component: DictJournalComponent;
  let fixture: ComponentFixture<DictJournalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DictJournalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DictJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
