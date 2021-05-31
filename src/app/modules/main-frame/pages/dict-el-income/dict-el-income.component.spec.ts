import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictElIncomeComponent } from './dict-el-income.component';

describe('DictElIncomeComponent', () => {
  let component: DictElIncomeComponent;
  let fixture: ComponentFixture<DictElIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DictElIncomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DictElIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
