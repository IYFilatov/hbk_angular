import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictElBankaccountComponent } from './dict-el-bankaccount.component';

describe('DictElBankaccountComponent', () => {
  let component: DictElBankaccountComponent;
  let fixture: ComponentFixture<DictElBankaccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DictElBankaccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DictElBankaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
