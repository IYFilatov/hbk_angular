import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictElCostComponent } from './dict-el-cost.component';

describe('DictElCostComponent', () => {
  let component: DictElCostComponent;
  let fixture: ComponentFixture<DictElCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DictElCostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DictElCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
