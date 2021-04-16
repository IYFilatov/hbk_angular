import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictElCurrencyComponent } from './dict-el-currency.component';

describe('DictElCurrencyComponent', () => {
  let component: DictElCurrencyComponent;
  let fixture: ComponentFixture<DictElCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DictElCurrencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DictElCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
