import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocElIncomeComponent } from './doc-el-income.component';

describe('DocElIncomeComponent', () => {
  let component: DocElIncomeComponent;
  let fixture: ComponentFixture<DocElIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocElIncomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocElIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
