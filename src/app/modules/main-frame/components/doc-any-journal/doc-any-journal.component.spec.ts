import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocAnyJournalComponent } from './doc-any-journal.component';

describe('DocAnyJournalComponent', () => {
  let component: DocAnyJournalComponent;
  let fixture: ComponentFixture<DocAnyJournalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocAnyJournalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocAnyJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
