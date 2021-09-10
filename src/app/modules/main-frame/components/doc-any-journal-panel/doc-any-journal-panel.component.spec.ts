import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocAnyJournalPanelComponent } from './doc-any-journal-panel.component';

describe('DocAnyJournalPanelComponent', () => {
  let component: DocAnyJournalPanelComponent;
  let fixture: ComponentFixture<DocAnyJournalPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocAnyJournalPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocAnyJournalPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
