import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InpDictBankaccTableComponent } from './inp-dict-bankacc-table.component';

describe('InpDictBankaccTableComponent', () => {
  let component: InpDictBankaccTableComponent;
  let fixture: ComponentFixture<InpDictBankaccTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InpDictBankaccTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InpDictBankaccTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
