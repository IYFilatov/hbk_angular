import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocElExpensesComponent } from './doc-el-expenses.component';

describe('DocElExpensesComponent', () => {
  let component: DocElExpensesComponent;
  let fixture: ComponentFixture<DocElExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocElExpensesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocElExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
