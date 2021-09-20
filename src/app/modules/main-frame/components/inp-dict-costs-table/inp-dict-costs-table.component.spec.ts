import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InpDictCostsTableComponent } from './inp-dict-costs-table.component';

describe('InpDictCostsTableComponent', () => {
  let component: InpDictCostsTableComponent;
  let fixture: ComponentFixture<InpDictCostsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InpDictCostsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InpDictCostsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
