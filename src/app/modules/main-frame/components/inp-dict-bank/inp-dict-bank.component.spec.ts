import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InpDictBankComponent } from './inp-dict-bank.component';

describe('InpDictBankComponent', () => {
  let component: InpDictBankComponent;
  let fixture: ComponentFixture<InpDictBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InpDictBankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InpDictBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
