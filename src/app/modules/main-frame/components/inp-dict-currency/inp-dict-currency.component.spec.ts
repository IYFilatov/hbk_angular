import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InpDictCurrencyComponent } from './inp-dict-currency.component';

describe('InpDictCurrencyComponent', () => {
  let component: InpDictCurrencyComponent;
  let fixture: ComponentFixture<InpDictCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InpDictCurrencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InpDictCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
