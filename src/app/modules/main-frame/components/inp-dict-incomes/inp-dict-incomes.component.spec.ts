import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InpDictIncomesComponent } from './inp-dict-incomes.component';

describe('InpDictIncomesComponent', () => {
  let component: InpDictIncomesComponent;
  let fixture: ComponentFixture<InpDictIncomesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InpDictIncomesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InpDictIncomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
