import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InpDictBankaccComponent } from './inp-dict-bankacc.component';

describe('InpDictBankaccComponent', () => {
  let component: InpDictBankaccComponent;
  let fixture: ComponentFixture<InpDictBankaccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InpDictBankaccComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InpDictBankaccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
