import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InpDictIncomesTableComponent } from './inp-dict-incomes-table.component';

describe('InpDictIncomesTableComponent', () => {
  let component: InpDictIncomesTableComponent;
  let fixture: ComponentFixture<InpDictIncomesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InpDictIncomesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InpDictIncomesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
