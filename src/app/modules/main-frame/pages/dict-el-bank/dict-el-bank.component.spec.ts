import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictElBankComponent } from './dict-el-bank.component';

describe('DictElBankComponent', () => {
  let component: DictElBankComponent;
  let fixture: ComponentFixture<DictElBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DictElBankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DictElBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
