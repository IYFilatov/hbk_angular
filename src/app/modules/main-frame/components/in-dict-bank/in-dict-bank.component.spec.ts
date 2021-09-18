import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InDictBankComponent } from './in-dict-bank.component';

describe('InDictBankComponent', () => {
  let component: InDictBankComponent;
  let fixture: ComponentFixture<InDictBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InDictBankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InDictBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
