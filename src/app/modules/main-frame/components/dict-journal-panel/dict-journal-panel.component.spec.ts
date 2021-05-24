import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictJournalPanelComponent } from './dict-journal-panel.component';

describe('DictJournalPanelComponent', () => {
  let component: DictJournalPanelComponent;
  let fixture: ComponentFixture<DictJournalPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DictJournalPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DictJournalPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
